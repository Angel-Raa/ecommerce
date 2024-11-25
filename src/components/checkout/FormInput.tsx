import {AddressFormValues} from "../../utils";
import {FieldErrors, UseFormRegister} from "react-hook-form";

type InputType =
    | "text"
    | "password"
    | "email"
    | "number"
    | "url"
    | "tel"
    | "search"
    | "date"
    | "datetime-local"
    | "month"
    | "week"
    | "time"
    | "color"
    | "file"
    | "checkbox"
    | "radio"
    | "range"
    | "button"
    | "submit"
    | "reset"
    | "hidden";

interface Props {
    register: UseFormRegister<AddressFormValues>
    errors: FieldErrors<AddressFormValues>,
    name: keyof AddressFormValues,
    clasName?: string,
    placeholder: string,
    typeInput?: InputType,
}

export const FormInput = ({
                                 register, clasName, placeholder, name, errors, typeInput,
                             }: Props) => {
    return (
        <>
            <div
                className={`border border-slate-200 rounded-md overflow-hidden py-2 ${errors[name] && 'border-red-500'} ${clasName}`}>
                <input type={typeInput || "text"} className={`w-full px-3 py-1 text-sm focus:outline-none`}
                       placeholder={placeholder}  {...register(name)}/>
            </div>
            {
                errors[name] && (
                    <p className={"text-red-500 text-xs"}>{errors[name]?.message} </p>
                )
            }

        </>
    )
}