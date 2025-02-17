import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {formSchema, FormValues, generateSlug} from "../../../utils";
import {IoIosArrowBack} from "react-icons/io";
import {Features, InputForm, Section, Uploader, Variants} from "./index";
import {useEffect} from "react";
import {Editor} from "./Editor";
import {useCreateProduct} from "../../../hook";
import {Loading} from "../../shared/loading/Loading";

interface Props {
  title: string;
}
export const Form = ({ title }: Props) => {
  const {mutate: create, isPending} = useCreateProduct()
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


  const watchName = watch("name");
  const onSubmit = handleSubmit((data) => {
    const features = data.features.map(feature => feature.value);

    create({
      name: data.name,
      brand: data.brand,
      slug: data.slug,
      variants: data.variants,
      images: data.images,
      description: data.description,
      features,
    })
  });


  useEffect(() => {
    if (!watchName) return;
    const generate: string = generateSlug(watchName);
    setValue("slug", generate, {
      shouldValidate: true,
    });
  }, [watchName, setValue]);

  if(isPending ) return <Loading />;
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
      <form
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-auto flex-1"
        onSubmit={onSubmit}
      >
        <Section
          title="Detalles de Productos"
          className="lg:col-span-2 lg:row-span-2"
        >
          <InputForm
            type="text"
            placeholder="Ejemplo: iPhone 15 Pro Max"
            label="Nombre del producto"
            name="name"
            register={register}
            errors={errors}
            required
          />
          <Features control={control} errors={errors} />
        </Section>
        <Section>
          <InputForm
            type="text"
            label="Slug"
            name="slug"
            placeholder="iphone-15-pro-max"
            register={register}
            errors={errors}
          />
          <InputForm
            type="text"
            label="Marca"
            name="brand"
            placeholder="Apple"
            register={register}
            errors={errors}
            required
          />
        </Section>
        <Section title="Variantes del Producto" className="lg:col-span-2 h-fit">
          <Variants control={control} errors={errors} register={register} />
        </Section>

        <Section title="Imágenes del producto">
          <Uploader errors={errors} watch={watch} setValues={setValue} />
        </Section>
        <Section title="Descripción del producto" className="col-span-full">
          <Editor setValue={setValue} errors={errors} />
        </Section>

        <div className="flex gap-3 absolute top-0 right-0">
          <button
            type="button"
            className="btn-secondary-outline"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>

          <button type="submit" className="btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
