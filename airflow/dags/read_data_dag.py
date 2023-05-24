from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.contrib.sensors.python_sensor import PythonSensor
from airflow.utils.log.logging_mixin import LoggingMixin
import pandas as pd
import numpy as np

from datetime import datetime


def get_or_create(session, model, engine, **kwargs):
    print(kwargs)
    instance = session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance
    else:
        engine.execute(model.insert(), is_archive=False, **kwargs)
        session.commit()
        instance = session.query(model).filter_by(**kwargs).first()
        return instance


def take_address_from_str(row):
    address_str = row["name"]
    dict_street = {"street": None, "house": None, "corpus": None, "composition": None, "structure": None}
    address_str = address_str.replace('Дом по адресу ', '').replace(', в.', ', д.').replace(', дом ', ', д.')
    if ', д.' in address_str:
        street, address_str = address_str.split(', д.')
        dict_street["street"] = street
        house = address_str.split(', ')
        dict_street["house"] = house[0]
        address_list = house[1:]
    else:
        address_list = address_str.split(', ')
        street, address_str = address_list[0], address_list[1:]
        dict_street["street"] = street
        address_list = address_str
        dict_street["house"] = None
    if address_list:
        for split in address_list:
            if split.startswith('корпус '):
                split = split.replace('корпус ', 'к.')
            if split.startswith('к.'):
                dict_street["corpus"] = split.replace('к.', '')
            elif split.startswith('с.'):
                dict_street["composition"] = split.replace('с.', '')
            elif split.startswith('сооружение '):
                dict_street["structure"] = split.replace('сооружение ', '')
            else:
                if dict_street["house"] is None:
                    dict_street["house"] = split
                else:
                    LoggingMixin().log.info(f'{address_str} haven\'t к./с./сооружение')
    return pd.Series(dict_street)


def _wait_for_xlsx(**kwargs):
    from pathlib import Path
    ti = kwargs['ti']
    path_ = Path("./tmp")
    data_files = path_.glob("*.xlsx")
    files = [str(i) for i in data_files]
    LoggingMixin().log.debug(f'Find files {files}')
    if len(files) == 5:
        ti.xcom_push(key='files', value=files)
    else:
        files = []
    return bool(files)


def extract_data(**kwargs):
    # Я знаю, что то, что мы дальше берём и таскаем данные из одного места в другое через словари это что-то
    # невообразимо ужасное. Однако уверю, что с теми данными, что нам дали иначе никак
    import os
    import json

    ti = kwargs['ti']
    list_files = ti.xcom_pull(key='files', task_ids=['_wait_for_xlsx'])[0]
    problem_type_dict = {}
    unom_area_dict = {}
    unom_area_district_dict = {}
    name_of_work_local_id_dict = {}
    data = {}
    for file in list_files:
        file_name = os.path.basename(file)
        if file_name == '1_Многоквартирные дома с технико-экономическими характеристиками.xlsx':
            reader = pd.read_excel(file, 'Sheet1').iloc[1:]
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id',
                           'col_758': 'col_758_id',
                           'col_769': 'col_769_id',
                           'col_770': 'col_770_id',
                           'col_775': 'col_775_id',
                           'col_781': 'col_781_id',
                           'col_2156': 'col_2156_id',
                           'col_2463': 'col_2463_id',
                           'col_3163': 'col_3163_id',
                           'col_3243': 'col_3243_id',
                           'col_103506': 'col_103506_id'},
                          axis=1, inplace=True)
            unom_set = {'set': reader.col_782.astype(int).values.tolist()}
            reader['local_id'] = reader['local_id'].astype(int).astype(str)
            reader['col_758_id'] = reader['col_758_id'].astype(str)
            reader['col_769_id'] = reader['col_769_id'].astype(str)
            reader['col_770_id'] = reader['col_770_id'].astype(str)
            reader['col_775_id'] = reader['col_775_id'].astype(str)
            reader['col_781_id'] = reader['col_781_id'].astype(str)
            reader['col_103506_id'] = reader['col_103506_id'].astype(str)
            reader['col_2156_id'] = reader['col_2156_id'].astype(str)
            reader['col_2463_id'] = reader['col_2463_id'].astype(str)
            reader['col_3163_id'] = reader['col_3163_id'].astype(str)
            reader['col_3243_id'] = reader['col_3243_id'].astype(str)
            reader['parent_id'] = reader['parent_id'].astype(str)

            reader = reader.fillna(np.nan).replace([np.nan], [None]).replace(['nan'], [None])
            data['Object'] = reader.to_dict('list')

            reader = pd.read_excel(file, 'COL_758', skiprows=1)
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            data['ProjectSeries'] = reader.to_dict('list')

            reader = pd.read_excel(file, 'COL_769', skiprows=1)
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            data['WallMaterial'] = reader.to_dict('list')

            reader = pd.read_excel(file, 'COL_770', skiprows=1)
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            data['SignBuildingAccident'] = reader.to_dict('list')

            reader = pd.read_excel(file, 'COL_775', skiprows=1)
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            data['OrderRoofCleaning'] = reader.to_dict('list')

            reader = pd.read_excel(file, 'COL_781', skiprows=1)
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            data['RoofMaterial'] = reader.to_dict('list')

            reader = pd.read_excel(file, 'COL_2156', skiprows=1)
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            data['TypeSocialObject'] = reader.to_dict('list')

            reader = pd.read_excel(file, 'COL_2463', skiprows=1)
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            data['TypeHousingStock'] = reader.to_dict('list')

            reader = pd.read_excel(file, 'COL_3163', skiprows=1)
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            data['MCDStatus'] = reader.to_dict('list')

            reader = pd.read_excel(file, 'COL_3243', skiprows=1)
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            data['MCDManagementStatus'] = reader.to_dict('list')

            reader = pd.read_excel(file, 'COL_103506', skiprows=1)
            reader.columns = reader.columns.str.lower()
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            data['MCDCategory'] = reader.to_dict('list')
        elif file_name == '2_Инциденты,_зарегистрированные_на_объектах_городского_хозяйства.xlsx':
            columns = ["problem_type", "source", "date_create", "date_close", "area", "object", "unom", "date_end"]
            reader_1 = pd.read_excel(file, 'Result 1')
            reader_1.columns = columns
            reader_2 = pd.read_excel(file, 'Result 2')
            reader_2.columns = columns
            reader = reader_1.append(reader_2, ignore_index=True)
            reader['problem_type'] = reader['problem_type'].astype(str)
            reader['object'] = reader['object'].astype(str)
            reader.rename({'problem_type': 'problem_type_id', 'object': 'object_id'}, axis=1, inplace=True)
            unom_area_dict = pd.Series(reader.area, index=reader.unom).to_dict()
            data["Problem"] = reader.to_dict('list')
        elif file_name == '3_Работы по капитальному ремонту, проведенные в многоквартирных домах.xlsx':
            reader = pd.read_excel(file, 'Лист3')
            reader.rename({'ElevatorNumber': 'Elevator_Number', 'AdmArea': 'Adm_Area', 'WORK_NAME': 'type_of_work'},
                          axis=1, inplace=True)
            reader.columns = reader.columns.str.lower()

            reader['type_of_work'] = reader['type_of_work'].astype(str)
            reader['plan_date_start'] = reader['plan_date_start'].astype('datetime64[ns]').astype(str)
            reader['plan_date_end'] = reader['plan_date_end'].astype('datetime64[ns]').astype(str)
            reader['fact_date_start'] = reader['fact_date_start'].astype('datetime64[ns]').astype(str)
            reader['fact_date_end'] = reader['fact_date_end'].astype('datetime64[ns]').astype(str)
            reader['num_entrance'] = reader['num_entrance'].fillna(0).astype(int).astype(str)
            reader['elevator_number'] = reader['elevator_number'].astype(str)

            reader = reader.fillna(np.nan).replace([np.nan], [None]).replace(['nan'], [None])
            reader.rename({'type_of_work': 'type_of_work_id', 'object': 'object_id'}, axis=1, inplace=True)
            unom_area_district_dict = pd.Series(zip(reader.adm_area.values, reader.district.values), index=reader.unom).to_dict()
            data['TaskInWork'] = reader.to_dict('list')
        elif file_name == '4_Виды работ по капитальному ремонту многоквартирных домов.xlsx':
            columns = ["local_id", "code", "name", "name_object", "type_of_work", "group_of_work", "abbreviated_name_of_work"]
            reader = pd.read_excel(file, 'Лист1', skiprows=1)
            reader.columns = columns
            reader['local_id'] = reader['local_id'].astype(str)
            name_of_work_local_id_dict = pd.Series(reader.local_id.values, index=reader.name).to_dict()
            data['TypeOfWork'] = reader.to_dict('list')
        elif file_name == '5_Типы событий, регистрируемых по типу объекта многоквартирный дом.xlsx':
            reader = pd.read_excel(file, 'Лист1')
            reader.rename({'id': 'local_id'}, axis=1, inplace=True)
            reader.fillna('', inplace=True)
            reader['local_id'] = reader['local_id'].astype(str)
            problem_type_dict = pd.Series(reader.local_id.values, index=reader.name).to_dict()
            data['ProblemType'] = reader.to_dict('list')
        LoggingMixin().log.info(f'Done with {file_name}')

    if list_files:
        ti.xcom_push(key='name_of_work_local_id_dict', value=name_of_work_local_id_dict)
        ti.xcom_push(key='unom_area_district_dict', value=unom_area_district_dict)
        ti.xcom_push(key='unom_set', value=unom_set)
        ti.xcom_push(key='unom_area_dict', value=unom_area_dict)
        ti.xcom_push(key='problem_type_dict', value=problem_type_dict)
        # Без этого постгрес ругается на то что данные слишком большие.
        # Можно было бы делать отдельно даг для каждого файла, но это невозможно из-за данных,
        # которые необходимо обрабатывать одновременно
        data_file = "./tmp/data.json"
        with open(data_file, "w") as outfile:
            json.dump(data, outfile)
        ti.xcom_push(key='data', value=data_file)
    else:
        raise Warning('No files to process')


def transform_data(**kwargs):
    import json
    import os
    tmp_replace = {
        "ремонт подвальных помещений, относящихся к общему имуществу в многоквартирном доме":
            "ремонт подвальных помещений, относящихся к общему имуществу собственников помещений",
        "ремонт подъездов, направленный на восстановление их надлежащего состояния и проводимый при выполнении иных работ по капитальному ремонту общего имущества в многоквартирном доме":
            "ремонт подъездов, направленный на восстановление их надлежащего состояния и проводимый при выполнении иных работ",
        "ремонт фасадов":
            "ремонт фасада",
        "ремонт внутридомовых инженерных систем электроснабжения":
            "ремонт внутридомовых инженерных сетей электроснабжения",
        "ремонт мусоропровода":
            "ремонт или замена мусоропровода",
        "замена оконных блоков, расположенных в помещениях общего пользования":
            "ремонт фасада (замена оконных блоков, расположенных в помещениях общего пользования в многоквартирном доме)",
        "ремонт внутреннего водостока":
            "ремонт или замена внутреннего водостока",
    }
    ti = kwargs['ti']
    file_name = ti.xcom_pull(key='data', task_ids=['extract_data'])[0]
    with open(file_name, 'r') as openfile:
        data_taken = json.load(openfile)
    os.remove(file_name)
    problem_type_dict = ti.xcom_pull(key='problem_type_dict', task_ids=['extract_data'])[0]
    unom_area_dict = ti.xcom_pull(key='unom_area_dict', task_ids=['extract_data'])[0]
    unom_set = ti.xcom_pull(key='unom_set', task_ids=['extract_data'])[0]['set']
    unom_area_district_dict = ti.xcom_pull(key='unom_area_district_dict', task_ids=['extract_data'])[0]
    name_of_work_local_id_dict = ti.xcom_pull(key='name_of_work_local_id_dict', task_ids=['extract_data'])[0]

    final_data = {}
    for model, file_data_taken in data_taken.items():
        if model == "Object":
            file_data_taken = pd.DataFrame(file_data_taken)
            file_data_taken["adm_area"] = file_data_taken['col_782'].apply(
                lambda x: unom_area_district_dict[x][0] if x in unom_area_district_dict else
                unom_area_dict[x] if x in unom_area_dict else None
            )
            file_data_taken['adm_area'] = file_data_taken['adm_area'].astype(str)
            file_data_taken = file_data_taken.fillna(np.nan).replace([np.nan], [None]).replace(['nan'], [None])
            file_data_taken['district'] = file_data_taken['col_782'].apply(
                lambda x: unom_area_district_dict[x][1] if x in unom_area_district_dict else None
            )
            file_data_taken = file_data_taken.join(file_data_taken.apply(take_address_from_str, axis=1)).to_dict('list')
        elif model == "Problem":
            file_data_taken = pd.DataFrame(file_data_taken)
            file_data_taken = file_data_taken.drop('source', axis=1)
            file_data_taken = file_data_taken.drop('area', axis=1)
            file_data_taken['problem_type_id'] = file_data_taken['problem_type_id'].apply(
                lambda x: problem_type_dict[x] if x in problem_type_dict else '750db123-c4ad-444d-bf8e-6263604700e7'
            )
            file_data_taken['object_id'] = file_data_taken['unom'].apply(
                lambda x: str(x) if x in unom_set else None
            ).astype(str)
            file_data_taken['date_end'] = file_data_taken['date_end'].astype(str)
            file_data_taken = file_data_taken.fillna(np.nan)\
                .replace([np.nan], [None])\
                .replace(['nan'], [None])\
                .replace(['None'], [None])
            file_data_taken = file_data_taken.to_dict('list')
        elif model == "TypeOfWork":
            file_data_taken = pd.DataFrame(file_data_taken)
            file_data_taken['type_of_work'] = file_data_taken['type_of_work'].apply(
                lambda x: "SERV" if x == "Услуга" else "WORK")
            file_data_taken = file_data_taken.to_dict('list')
        elif model == "TaskInWork":
            file_data_taken = pd.DataFrame(file_data_taken)
            file_data_taken['type_of_work_id'] = file_data_taken['type_of_work_id'].apply(
                lambda x: name_of_work_local_id_dict[x]
                if x not in tmp_replace else
                name_of_work_local_id_dict[tmp_replace[x]]
            )
            file_data_taken = file_data_taken.drop('adm_area', axis=1)
            file_data_taken = file_data_taken.drop('district', axis=1)
            file_data_taken = file_data_taken.drop('address', axis=1)
            file_data_taken['object_id'] = file_data_taken['unom'].apply(
                lambda x: x if x in unom_set else None
            )
            file_data_taken = file_data_taken.to_dict('list')
        final_data[model] = file_data_taken

    ti.xcom_push(key='data', value=final_data)


def load_data(**kwargs):
    import sqlalchemy as sa
    from sqlalchemy import create_engine, insert
    from sqlalchemy.orm import Session
    import os
    ti = kwargs['ti']
    engine = create_engine(
        f'postgresql+psycopg2://{os.getenv("DB_USER")}:{os.getenv("DB_PASS")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}'
    )
    second_wave = ['Object', 'TaskInWork', 'Problem']
    data = ti.xcom_pull(key='data', task_ids=['transform_data'])[0]
    with Session(engine) as session:
        for model, data_taken in data.items():
            if model in second_wave:
                continue
            else:
                table = sa.Table(f"api_{model.lower()}", sa.MetaData(), autoload_with=engine)
                values = [dict(zip(data_taken, t)) for t in zip(*data_taken.values())]
                stmt = table.update().values(is_archive=True)
                engine.execute(stmt)
                for value in values:
                    result = get_or_create(session, table, engine, **value)
                    stmt = table.update().values(is_archive=False).where(table.c.id == result.id)
                session.commit()
        for model in second_wave:
            data_taken = data[model]
            table = sa.Table(f"api_{model.lower()}", sa.MetaData(), autoload_with=engine)
            values = [dict(zip(data_taken, t)) for t in zip(*data_taken.values())]
            stmt = table.update().values(is_archive=True)
            engine.execute(stmt)
            for value in values:
                result = get_or_create(session, table, engine, **value)
                stmt = table.update().values(is_archive=False).where(table.c.id == result.id)
            session.commit()

# Following are defaults which can be overridden later on
args = {
    'owner': 'nikita',
    'start_date': datetime(2022, 1, 1),
    'provide_context': True
}


with DAG('etl_data', description='extract transform load data parsed from files', schedule_interval='*/1 1 1 * *',
         catchup=False, default_args=args) as dag:  # 0 * * * *   */1 * * * *

    sensor_data = PythonSensor(
        task_id="_wait_for_xlsx",
        python_callable=_wait_for_xlsx,
        poke_interval=30,
        timeout=1 * 60,
        mode='reschedule'
    )
    extract = PythonOperator(
        task_id='extract_data',
        python_callable=extract_data)
    transform = PythonOperator(
        task_id='transform_data',
        python_callable=transform_data)
    load = PythonOperator(
        task_id='load_data',
        python_callable=load_data)

    sensor_data >> extract
    extract >> transform
    transform >> load
