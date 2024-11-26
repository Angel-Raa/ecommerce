export const About = (): React.JSX.Element => {
    return (
        <>
            <section className="space-y-5">
                <h1 className="text-center text-4xl font-semibold tracking-tight mb-5">
                    Sobre Nosotros
                </h1>
                <img
                    src="https://media.istockphoto.com/id/511061090/es/foto/negocios-edificio-de-oficinas-en-londres-inglaterra.jpg?s=612x612&w=0&k=20&c=oGQEBCRRR72a00Y-ykb41ddlp_c4EaTwIs2CJ6odWb4="
                    alt="Imagen representativa de nuestra tienda" className="h-[500px] w-full object-cover"/>
                <div className="flex flex-col gap-5 tracking-tighter leading-7 text-sm font-medium text-slate-800">
                    <p>
                        Bienvenido a <strong>ZonaMóvil</strong>, tu tienda en línea especializada en la venta de
                        celulares. Fundada en <strong>2025</strong>, nuestra misión es brindar a cada cliente
                        dispositivos móviles de la más alta calidad al mejor precio del mercado. Nos enorgullece contar
                        con un equipo de expertos comprometidos en seleccionar los mejores productos para satisfacer tus
                        necesidades tecnológicas.
                    </p>
                    <p>
                        En <strong>ZonaMóvil</strong>, encontrarás una amplia variedad de celulares de marcas
                        reconocidas a nivel mundial. Además, te ofrecemos <strong>promociones
                        exclusivas</strong> y <strong>descuentos especiales</strong>, asegurándote siempre una
                        experiencia de compra insuperable.
                    </p>
                    <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
                        ¡No esperes más, consigue tu celular ideal en ZonaMóvil!
                    </h2>
                    <p>
                        Si necesitas más información o tienes alguna consulta, no dudes en ponerte en contacto con
                        nosotros. Escríbenos a nuestro correo electrónico:
                        <a href="mailto:correo@zonalmovil.com" className="text-blue-600 hover:underline">
                            correo@zonalmovil.com
                        </a>
                        o llámanos al
                        <a href="tel:8294124929" className="text-blue-600 hover:underline">
                            829-412-4929
                        </a>. Estamos aquí para ayudarte.
                    </p>
                </div>
            </section>

        </>
    )
}