export enum TypeMovementEnum {
  INPUT = "fef13d83-cf25-4391-9e09-f2e83c1565ba",
  OUTPUT = "3eb0e5d3-3725-44ea-8458-101b7e20be85",
  ADJUSTMENT = "b974e13f-3e3d-45e5-b6ec-77d9938cfb45",
}

export function stringToTypeMovementEnum(value: string): TypeMovementEnum | null {
    // Iterar sobre los valores del enum
    const enumValues = Object.values(TypeMovementEnum) as string[];
    if (enumValues.includes(value)) {
      return value as TypeMovementEnum;
    }
    return null; // Retornar null si no coincide
  }

export function translateMovementType(type: TypeMovementEnum): string {
  switch (type) {
    case TypeMovementEnum.INPUT:
      return "Entrada";
    case TypeMovementEnum.OUTPUT:
      return "Salida";
    case TypeMovementEnum.ADJUSTMENT:
      return "Ajuste";
    default:
      return "Desconocido";
  }
}
