const apiKey = context.env.SENDGRID_API_KEY;
const from = context.env.SENDGRID_FROM_EMAIL;
const to = context.env.SENDGRID_TO_EMAIL;

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 1. Extraer los datos del formulario
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // 2. Llamada a la API de SendGrid
    const sendGridResponse = await fetch("https://api.sendgrid.com", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: env.SENDGRID_TO_EMAIL }] }],
        from: { email: env.SENDGRID_FROM_EMAIL },
        subject: `Nuevo mensaje de ${name}`,
        content: [
          {
            type: "text/plain",
            value: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
          },
        ],
      }),
    });

    if (!sendGridResponse.ok) {
      throw new Error("Error al enviar con SendGrid");
    }

    // 3. Redirigir al usuario tras el éxito o devolver un mensaje
    return new Response("¡Mensaje enviado con éxito!", { status: 200 });

  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}