export async function onRequestPost(context) {
  const formData = await context.request.formData();
  
  const nombre = formData.get("nombre");
  const email = formData.get("email");
  const mensaje = formData.get("mensaje");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Formulario <onboarding@resend.dev>",
      to: "tucorreo@gmail.com",   // AQUI pones el correo donde quieres recibir
      subject: "Nuevo mensaje desde tu web",
      html: `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
      `
    })
  });

  return new Response("Formulario enviado correctamente", { status: 200 });
}