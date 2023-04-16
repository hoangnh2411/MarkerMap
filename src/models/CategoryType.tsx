import { MapType, MarkerType } from "./MarkerType"

export type CategoryType = {
    name: string,
    iconColor: string,
    iconColorText: string,
    _id: any,
    markers: MapType,
    markerText: string,
    places: MarkerType[],
}

export type CategoriesType = CategoryType[]