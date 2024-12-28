import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { FormValues } from "../../../utils";
import { IoIosCloseCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";

interface Props {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  name?: keyof FormValues;
}

const headers = ["Stock", "Precio", "Capacidad", "Color", ""];

export const Variants = ({ control, errors, name, register }: Props) => {
  const [colorActive, setColorActive] = useState<boolean[]>([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  const addVariant = () => {
    append({
      stock: 0,
      price: 0,
      storage: "",
      color: "",
      colorName: "",
    });
  };
  const removeVariant = (index: number) => {
    remove(index);
  };
  // Usar useWatch una sola vez para observar todos los valores del color y del colorName
  const colorValues = useWatch({
    control,
    name: fields.map((_, index) => `variants.${index}.color` as const),
  });

  const colorNameValues = useWatch({
    control,
    name: fields.map((_, index) => `variants.${index}.colorName` as const),
  });
  const getFirstError = (
      variantErros: FieldErrors<FormValues['variants'][number]>
  ) => {
    if (variantErros) {
      const keys = Object.keys(
          variantErros
      ) as (keyof typeof variantErros)[];
      if (keys.length > 0) {
        return variantErros[keys[0]]?.message;
      }
    }
  };

  const toggleColorActive = (index: number) => {
    setColorActive((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  useEffect(() => {
    setColorActive((prev) => fields.map((_, index) => prev[index] || false));
  }, [fields]);
  return (
    <>
      <div className="flex flex-col gap-3 ">
        <div className="space-y-4 border-d border-slate-200 pd-6">
          <div className="grid grid-cols-5 gap-4 justify-start">
            {headers.map((h, it) => (
              <p className="text-xs font-semibold text-slate-800" key={it}>
                {h}
              </p>
            ))}
          </div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="grid grid-cols-5 gap-4 items-center">
                {/** INPUT */}
                <input
                  className="border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none"
                  type="number"
                  placeholder="Stock"
                  {...register(`variants.${index}.stock`, {
                    valueAsNumber: true,
                  })}
                />
                <input
                  type="number"
                  placeholder="Price"
                  step={"0.01"}
                  className="border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none"
                  {...register(`variants.${index}.price`, {
                    valueAsNumber: true,
                  })}
                />
                <input
                  type="text"
                  placeholder="64 GB"
                  className="border rounded-md px-3 py-1.5 text-xs font-semibold placeholder:font-normal focus:outline-none appearance-none"
                  {...register(`variants.${index}.storage`)}
                />
                <div className="flex relative ">
                  {colorActive[index] && (
                    <div className="absolute bg-stone-100 rounded-md bottom-8 left-[40px] w-[100px] h-fit space-y-2">
                      <input
                        type="color"
                        {...register(`variants.${index}.color`)}
                        className="rounded-md px-3 py-1.5 w-full"
                      />
                      <input
                        type="text"
                        placeholder="Azul Marino"
                        {...register(`variants.${index}.colorName`)}
                        className="rounded-md px-3 py-1.5 w-full text-xs focus:outline-none font-semibold placeholder:font-normal"
                      />
                    </div>
                  )}
                  {/** TODO:  BUTTON DE COLOR **/}
                  <button
                    className="border w-full h-8 cursor-pointer rounded text-xs font-medium flex items-center justify-center"
                    type="button"
                    onClick={() => toggleColorActive(index)}
                  >
                    {colorValues[index] && colorNameValues[index] ? (
                      <span
                        className={`inline-block w-4 h-4 rounded-full bg-block`}
                        style={{
                          backgroundColor: colorValues[index],
                        }}
                      />
                    ) : (
                      "Añadir"
                    )}
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    className="p-1"
                    type="button"
                    onClick={() => removeVariant(index)}
                  >
                    <IoIosCloseCircleOutline size={22} />
                  </button>
                </div>
              </div>
              {/** ERRORS */}
              {errors.variants && errors.variants[index] && (
                  <p className='text-red-500 text-xs mt-1'>
                    {getFirstError(errors.variants[index] as any)}
                  </p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={addVariant}
          className="px-4 py-2 text-slate-800 rounded-md text-sm font-semibold tracking-tight flex items-center gap-1 self-center hover:bg-slate-100"
          type="button"
        >
          <IoIosAddCircleOutline size={16} />
          Añadir Variante
        </button>

        {fields.length === 0 && errors.variants && (
          <p className="text-red-500 text-xs mt-1">
            Debes añadir al menos una variante
          </p>
        )}
      </div>
    </>
  );
};
