import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { formSchema, FormValues } from "../../../utils";
import { IoIosArrowBack } from "react-icons/io";
import { Section, InputForm } from "./index";

interface Props {
  title: string;
}
export const Form = ({ title }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();
  const onSubmit =  handleSubmit((data) => {
    console.log(data);
  })
  return (
    <div className="flex flex-col relative gap-6 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-white p-1.5 rounded-md shadow-sm border border-slate-200 transition-all group-hover:scale-105"
          >
            <IoIosArrowBack
              size={20}
              className="transition-all group-hover:scale-125"
            />
          </button>
          <h2 className="font-bold tracking-tight text-2xl capitalize">
            {title}
          </h2>
        </div>
      </div>
      <form  className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-auto flex-1" onSubmit={onSubmit}>

        <Section title="Detalles de Productos" className="lg:col-span-2 lg:row-span-2">
            <InputForm 
            type="text"
            placeholder="Ejemplos: Apple"
            label="Nombre del producto"
            name="name"
            register={register}
            errors={errors}
            required

            
            
            />
        </Section>

      </form>
    </div>
  );
};
