import { HStack } from "@/components/ui";
import Map, { Marker } from "react-map-gl";
import { Card, Descriptions, Table } from "antd";
import { useCallback, useState } from "react";

const columns = [
    {
        title: "Название объекта",
        dataIndex: "houseName",
        key: "houseName",
    },
];

const sourceData = [
    {
        key: 1,
        houseName: "Дом по адресу Измайловский бульвар 47",
    },
    {
        key: 2,
        houseName: "Дом по адресу Парковая 6-я 29Б",
    },
    {
        key: 3,
        houseName: "Дом по адресу Нижняя Первомайская 62"
    },
    {
        key: 4,
        houseName: "Дом по адресу Нижняя Первомайская 49"
    }
];

export const ManagementMap = () => {

    const [isSelectObject, setIsSelectObject] = useState(false);

    const selectObjectHandler = useCallback(() => {
        setIsSelectObject(true);
    },[]);


    return (
        <HStack align={"start"} gap={24}>
            <Map
                mapboxAccessToken={"pk.eyJ1Ijoia29sb215YWthIiwiYSI6ImNsaHdmdWx4aTAycjYzbXBoMnV5bmgydmoifQ.Cxqs8slOAnvHNA2pWRTQYw"}
                initialViewState={{
                    longitude: 37.618423,
                    latitude: 55.751244,
                    zoom: 10
                }}
                style={{ width: 600, height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker
                    style={{ width: 30, height: 30 }}
                    onClick={selectObjectHandler}
                    latitude={55.79732}
                    longitude={37.79972}
                />
            </Map>

            {
                !isSelectObject
                    ? <Table
                        bordered
                        dataSource={sourceData}
                        columns={columns}
                        pagination={false}
                    />
                    : <Card size="small" title={"Дом по адресу Измайловский бульвар 47"}  style={{ width: 250 }}>
                        <Descriptions
                            column={1}
                        >
                            <Descriptions.Item label="Категория объекта">МКД</Descriptions.Item>
                            <Descriptions.Item label="Округ">Восточный</Descriptions.Item>
                            <Descriptions.Item label="Район">Московский</Descriptions.Item>
                            <Descriptions.Item label="Улица">Измайловский бульвар</Descriptions.Item>
                            <Descriptions.Item label="Дом">47</Descriptions.Item>
                            <Descriptions.Item label="Год постройки">1952</Descriptions.Item>
                            <Descriptions.Item label="Год реконструкции">-</Descriptions.Item>
                            <Descriptions.Item label="Кол-во этажей">5</Descriptions.Item>
                            <Descriptions.Item label="Аварийность">-</Descriptions.Item>
                            <Descriptions.Item label="UNOM">8625</Descriptions.Item>
                        </Descriptions>
                    </Card>


            }
        </HStack>
    );
};