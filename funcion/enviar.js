const apiKey = context.env.SENDGRID_API_KEY;
const from = context.env.SENDGRID_FROM_EMAIL;
const to = context.env.SENDGRID_TO_EMAIL;

export async function onRequest(context) {
  try {
    // 1️ Obtener datos del formulario enviados vía POST
    const { name, email, message } = await context.request.json();

    // 2️ Construir el payload para SendGrid
    const payload = {
      personalizations: [
        {
          to: [{ email: context.env.SENDGRID_TO_EMAIL }],
          subject: "Nuevo mensaje desde tu formulario",
        },
      ],
      from: { email: context.env.SENDGRID_FROM_EMAIL },
      content: [
        {
          type: "text/plain",
          value: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        },
      ],
    };

    // 3️ Llamada a la API de SendGrid
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${context.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    // 4️ Responder al frontend que fue exitoso
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    // Si hay un error, devolverlo al frontend
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}