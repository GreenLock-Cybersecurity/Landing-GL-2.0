# Handoff: Landing GreenLock v2 (greenlock.tech)

## Resumen
Cambios de diseño y conversión sobre la home actual del repo `DiegoRodriguez-GL/Landing-GL-2.0` (Astro 5 + Tailwind 4, componentes en `src/components/home/`). Incluye:
- Hero nuevo con un botón de contacto («Hablar con un experto»).
- Sección de investigación ampliada.
- Partners con mascotas.
- Nuevo orden de secciones.
- Un pop up de informe gratuito, una mascota con bocadillo y 4 formularios propios que envían los leads a un Worker de Cloudflare (este reenvía al CRM).

## Sobre los archivos de diseño
- `referencia/GreenLock Landing.dc.html` es el **prototipo HTML de referencia**, no código de producción. Todos los estilos van inline y la lógica está al final, en `class Component`. Úsalo para copiar textos, medidas y comportamiento exactos y **recréalo con las convenciones del repo**:
  - componentes `.astro` con `<style>` con ámbito;
  - `Image` de `astro:assets`;
  - `container-custom`, `section-padding`, `gl-btn-primary` y `gl-btn-ghost`;
  - `data-ref` en los enlaces de WhatsApp;
  - scripts que se reinicializan en `astro:after-swap`, porque el sitio usa ViewTransitions.
- **Fidelidad: alta** para todo lo nuevo o modificado.
- **Tipografía:** el prototipo usa Ubuntu y Ubuntu Mono como sustitutas. En el repo usa las existentes: `font-sans` (Inter Variable) y `font-mono` (JetBrains Mono). Los botones deben llevar el peso del repo (600).
- **Código que no se usa:** ignora `SCAN_STEPS`, `startScan`, `scanIdle` y `splitRef` del prototipo; ya no se utilizan.

## 0. `src/pages/index.astro`
Orden nuevo:
```
Hero → CaseStudyHighlight → ServicesGrid → OsintService → PartnerSection → TrustBar → Team → BlogRecent → FinalCTA
```
- Monta una sola vez el nuevo `<LeadModals />` (ver punto 8).
- `title`: `GreenLock | Auditoría de ciberseguridad, pentesting e investigación OSINT para empresas`
- `description`: `Auditoría de ciberseguridad, pentesting y red team para pymes y empresas en España. Investigación OSINT de estafas y suplantación de marca con informe pericial. Informe de exposición digital gratuito.`
- En `serviceSchema.hasOfferCatalog.itemListElement`, añade dos `Offer`:
  - `Investigación OSINT e informe pericial`, con la descripción «Identificamos quién está detrás de estafas, marcas falsas y cuentas anónimas, con un informe pericial listo para denunciar.»
  - `Informe gratuito de exposición digital`, con la descripción «Análisis gratuito de las principales exposiciones de tu negocio en internet.»

## 1. `src/components/layout/Header.astro`
- En `navLinks`, cambia `Ciberinteligencia` por `Investigaciones` (sigue apuntando a `/#osint`).
- Cuando aparezca la mascota de partners (punto 8.4), el botón «Hazte Partner» del header muestra un anillo verde pulsante:
  - Es un `span` absoluto con `inset:0`, `border:2px solid #22C55E` y `animation: glRing 1.6s ease-out infinite`.
  - Se activa con una clase, por ejemplo `is-pulsing` en `.header-cta-btn`, que pone LeadModals.
- No toques la barra de anuncio ni el menú móvil.

## 2. `src/components/home/Hero.astro` (rediseño)
Elimina el grid de 2 columnas, los dos botones actuales y las decoraciones SVG de las esquinas.

**Sección**
- `position:relative; overflow:hidden; background:#F3F4F6; min-height:100svh`.
- Contenido centrado: flex en columna, `align-items:center`, `text-align:center`.
- Mantén el `padding-top: clamp(7rem,10vw,10rem)` actual (el header es fijo) y un padding inferior de `clamp(3rem,5vw,4rem)`.

**Círculo blanco de fondo**
- `position:absolute; left:50%; top:46%; width:min(900px,130vw); aspect-ratio:1; transform:translate(-50%,-50%); border-radius:50%; background:#FFF`.

**Contenedor del contenido**
- `position:relative; max-width:1100px; gap:20px`.

**Elementos, en este orden**
1. **`h1`**: «Protege tu empresa».
   - Estilo: `font-size:clamp(3rem,7.6vw,7.5rem); line-height:.92; letter-spacing:-.05em; font-weight:700; color:#030712`.
   - Dentro, un span en bloque con el texto «antes de perder dinero y clientes.».
   - Estilo del span: `margin-top:.2em; font-size:.4em; line-height:1.1; letter-spacing:-.02em; font-weight:300; color:#64748B`.
2. **Imagen** `Hero-GL.webp` (`loading="eager"`, `fetchpriority="high"`).
   - Estilo: `height:min(36vh,400px); width:auto; max-width:90%; margin:4px 0 -6px`.
3. **Bloque de contacto**
   - Estilo: `max-width:620px`, flex en columna, `gap:18px`.
   - **Texto:** «¿Te preocupa la seguridad de tu empresa y no sabes por dónde empezar? **Hablemos, sin compromiso.**»
     - Estilo: `font-size:clamp(1.125rem,1.8vw,1.375rem); line-height:1.5; color:#334155; text-wrap:balance`.
     - El `strong` va en `#030712` con peso 700.
   - **Botón** «Hablar con un experto →»: abre el modal **asesoría** (punto 8.2).
     - Estilo: `gl-btn-primary` con `padding:20px 40px; font-size:19px; box-shadow:0 20px 40px -20px rgba(22,163,74,.7)`.
   - **Nota:** «Te contactaremos en menos de 24 horas.», `14px #64748B`.
4. **Fila de enlaces**
   - Estilo: `gap:28px; flex-wrap:wrap; justify-content:center; 16.5px; weight 500`.
   - «Asesoramiento gratuito por WhatsApp»:
     - Va en `#16A34A`, con hover `#15803D`.
     - Apunta a la URL de WhatsApp que ya tiene el hero, con `data-ref="WEB-HERO"`.
   - «Cómo trabajamos ↓»: `#334155`, con hover `#030712`, y enlace a `#servicios`.

## 3. `src/components/home/ServicesGrid.astro`
- Encima del `h2`, añade la etiqueta «Servicios de ciberseguridad».
  - Estilo: `color:#22C55E; font-size:clamp(1.25rem,2.4vw,1.625rem); font-weight:700; letter-spacing:.04em; text-transform:uppercase; margin-bottom:16px`, igual que la etiqueta de OsintService.
- En «Ciberseguridad Continua», sustituye `continua.webp` por la mascota nueva `assets/continua-robot.png`. Mantén el tamaño de 180 px.
- El resto no cambia.

## 4. `src/components/home/OsintService.astro`
> **Legal:** no uses la palabra «detective» en ningún texto visible ni en los `alt`. GreenLock no tiene licencia de detective. El nombre de archivo `detective.png` puede quedarse.

**a) Cabecera**
- Sustituye la etiqueta «Investigación OSINT» por dos líneas:
  - «Investigación digital», con el mismo estilo de etiqueta y `margin-bottom:6px`.
  - «Ciberinteligencia · Investigación OSINT», con `font-mono; 13px; letter-spacing:.16em; uppercase; color:#64748B; margin-bottom:18px`.
- El `h2` y el subtítulo se quedan igual.

**b)** Las 3 tarjetas actuales no cambian.

**c) Bloque nuevo «¿Te ha pasado algo de esto?»**
- Contenedor: `margin-top:64px`, flex en columna, `gap:18px`.
- `h3` centrado: `clamp(1.375rem,2.4vw,1.875rem) 700 #0F172A`.
- Grid: `repeat(auto-fit,minmax(min(100%,280px),1fr))`, `gap:12px`.
- Contiene 4 `<button>`:
  - Estilo: `display:flex; justify-content:space-between; gap:14px; padding:18px 20px; background:#FFF; border:1px solid #E5E7EB; 16.5px 500 #111827; text-align:left`.
  - Texto a la izquierda y «→» a la derecha (`#16A34A`, 18px).
  - Hover: `border-color:#22C55E; background:#F0FDF4`.
- Cada botón abre el modal **osint** (punto 8.2) con el caso ya marcado:

| Texto del botón | Caso marcado en el modal |
|---|---|
| Me han estafado comprando o invirtiendo online | Estafa o fraude online |
| Alguien usa mi marca, mi web o mi nombre | Suplantación de marca |
| Me acosan o difaman desde una cuenta anónima | Perfilado y reputación |
| Necesito pruebas para denunciar o ir a juicio | Otro |

**d) Bloque nuevo «Así trabajamos tu caso»**
- Contenedor: `margin-top:64px`, `gap:22px`. El `h3` lleva el mismo estilo que en (c).
- **Grid:** 3 columnas desde 900 px y 1 columna por debajo, `gap:20px`.
- **Conector:** detrás de las tarjetas hay una línea discontinua, solo desde 900 px.
  - Estilo: `position:absolute; left:8%; right:8%; top:105px; border-top:2px dashed #86EFAC; z-index:0`.
- **Tarjeta** (`z-index:1`):
  - Estilo: `background:#FFF; border:1px solid #E5E7EB; overflow:hidden`.
  - Hover: `translateY(-6px)`, `box-shadow:0 26px 50px -28px rgba(15,23,42,.35)` y `border-color:#BBF7D0`.
  - Transición: `.3s cubic-bezier(.2,.8,.2,1)`.
- **Franja superior de la tarjeta**
  - Estilo: `height:210px`, fondo `#F0FDF4` (la tarjeta 2 usa `#DCFCE7`).
  - Imagen alineada abajo: `height:190px; max-width:80%; object-fit:contain`.
  - Número grande «01», «02» o «03»: `absolute; left:18px; top:6px; 96px; 700; letter-spacing:-.05em; line-height:1; color:rgba(22,163,74,.16)`.
- **Cuerpo de la tarjeta**
  - Estilo: `padding:22px 24px 26px`, `gap:8px`.
  - Etiqueta «PASO 01»: `font-mono 12px; letter-spacing:.14em; padding:4px 10px; background:#F0FDF4; color:#15803D`.
  - `h4`: `21px 700 #0F172A; line-height:1.2`.
  - `p`: `15.5px; line-height:1.6; #64748B`.

| Paso | Título | Texto | Imagen |
|---|---|---|---|
| 01 | Nos cuentas qué ha pasado | Por formulario o por WhatsApp. Todo es confidencial. | `partner-consultoria.png` |
| 02 | Investigamos | Seguimos el rastro digital con fuentes abiertas (OSINT). | `detective.png` |
| 03 | Recibes un informe pericial | Listo para denunciar o aportar en un juicio. | `partner-compliance.png` |

**e) Cierre** (sustituye a `.os-foot`)
- Contenedor centrado en columna: `gap:14px; margin-top:48px`.
- Texto «Cuanto antes actúes, más rastro queda.», `18px 700 #0F172A`.
- Botones (`gap:12px`, con salto de línea, centrados):
  - Primario «Cuéntanos tu caso»: abre el modal **osint** con el caso 0. Estilo `padding:18px 40px`.
  - Con borde «Cuéntanoslo por WhatsApp»:
    - Estilo: `border:2px solid #16A34A; color:#15803D; padding:16px 36px`, con hover `background:#16A34A; color:#FFF`.
    - Enlace: `https://wa.me/34603358517?text=Hola%2C%20quiero%20contaros%20mi%20caso%20(investigaci%C3%B3n)`, con `data-ref="WEB-OSINT"`.
- Nota: «Confidencial · Te contactaremos en menos de 24 horas.», `14px #64748B`.

**Espaciado:** OSINT y Partners quedan ahora seguidas y las dos tienen fondo `#f3f4f6`. Usa un padding vertical de 6rem en ambas, como en el prototipo, para que no se peguen.

## 5. `src/components/home/PartnerSection.astro`
- **`h2`:** «Ofrece ciberseguridad a tus clientes <span verde>sin montar un equipo.</span>». Quita «ofensiva».
- **Imágenes de las tarjetas:** en lugar del icono SVG circular, cada tarjeta lleva una mascota.
  - Estilo: `width:220px; height:250px; object-fit:contain; margin:-12px 0 12px`.
  - MSSP: `partner-mssp.png`.
  - Consultoría: `partner-consultoria.png`.
  - Compliance: `partner-compliance.png`.
- **Texto de Consultoría tecnológica:** «Incorpora nuestros servicios de ciberseguridad a tu catálogo y ofrécelos a tus clientes con tu marca, sin ampliar tu equipo.»
- **Lista de beneficios:** mantenla, aunque no aparezca en el prototipo.
- **Botones:** dos, con `gap:14px`, con salto de línea y centrados.
  - «Quiero ser partner», como `<button>` con estilo `gl-btn-primary`. Abre el **modal de partner** (punto 8.3).
  - «Contáctanos», con estilo `gl-btn-ghost`. Usa el `ctaHref` actual de WhatsApp, con `data-ref="WEB-PARTNER"`.
- La nota inferior no cambia.

## 6. `TrustBar.astro`, `Team.astro`, `BlogRecent.astro` y `Footer.astro`
No cambian; solo se mueven de sitio (ver el punto 0).

## 7. `src/components/home/FinalCTA.astro`
- «Solicitar auditoría» pasa a ser un `<button>` que abre el modal **auditoría**; ya no abre WhatsApp.
- «Consulta gratuita» pasa a llamarse «Informe gratuito» y abre el **pop up de informe** (punto 8.1). Cuando se pulsa este botón, el pop up se abre siempre, aunque ya se haya mostrado en la sesión.
- El resto no cambia.

## 8. Nuevo: `src/components/home/LeadModals.astro` + `src/lib/leads.ts`
Contiene 3 modales y la mascota.

**Cómo se abren**
- Recomendado: delegación de clics sobre `[data-open]`.
  - `data-open="asesoria|osint|auditoria|partner|informe"`.
  - Opcional: `data-opt="N"` para indicar la opción marcada de entrada.
- Al abrir cualquier modal se cierran el pop up de informe y la mascota.

**Comportamiento común**
- Capa de fondo: `fixed; inset:0; z-index:90`. El modal está centrado y tiene `padding:20px` alrededor.
- Se cierra pulsando el fondo, el botón ×, o con Escape.
- Mientras está abierto se bloquea el scroll del `body`.
- Con `prefers-reduced-motion`, quita las animaciones infinitas.

### 8.1 Pop up «Informe gratuito»
**Cuándo aparece** (una vez por sesión, con `sessionStorage`), lo primero que ocurra de esto:
- a los 40 s en la página;
- cuando `#servicios.getBoundingClientRect().bottom < innerHeight * 0.35`, es decir, al haber pasado Servicios;
- con intención de salida en escritorio (`mouseleave` con `clientY <= 0`).

**Cuándo no aparece:** si ya se envió el formulario o si hay otro modal abierto.

**Fondo:** `rgba(15,23,42,.35)` con `backdrop-filter:blur(2px)`.

**Tarjeta**
- Estilo: `max-width:440px; background:#FFF; overflow:hidden; box-shadow:0 30px 70px -20px rgba(15,23,42,.45)`.
- Entrada: `glSpring .7s cubic-bezier(.2,.8,.2,1) both`.
- Botón × de 34 px, arriba a la derecha a 10 px, con fondo `rgba(255,255,255,.9)`.

**Cabecera visual**
- Estilo: `height:150px; background:linear-gradient(180deg,#F0FDF4,#FFF)`.
- Tres anillos de radar:
  - Estilo: `220px`, redondos, `border:2px solid rgba(34,197,94,.45)`, centrados en `left:50%; top:55%`.
  - Animación: `glRadar 2.4s ease-out infinite`, con retrasos de 0 s, 0,8 s y 1,6 s.
- Mascota `360.webp`: `width:136px`, centrada, `top:12px`, con `glFloat 4s ease-in-out infinite`.
- Etiqueta «GRATIS»:
  - Posición: `left:24px; top:24px`.
  - Estilo: fondo blanco, `border:1px solid #D1FAE5`, `#15803D`, `12px 700`, `letter-spacing:.08em`, `padding:6px 10px`.
  - Entrada: `glInUp .5s .5s both`.

**Cuerpo** (`padding:8px 28px 28px`, `gap:12px`)
- `h3` centrado, `25px 700 #030712`: «¿Tu negocio está <span #22C55E>expuesto?</span>».
- `p` centrado, `16px #64748B`: «Analizamos las principales exposiciones de tu negocio en internet para saber si necesitas reforzar tu ciberseguridad. Gratis.»
- Campos, todos obligatorios: «Web de tu empresa», «Tu email de trabajo» (`type="email"`) y «Tu nombre».
  - Estilo: `border:1px solid #E5E7EB; background:#F9FAFB; padding:14px 15px; 15.5px`.
  - Foco: `border #22C55E`, fondo blanco y `box-shadow:0 0 0 3px rgba(34,197,94,.18)`.
- Botón «Compruébalo gratis», a todo el ancho y con `padding:16px`.
- Nota «Te contactaremos en menos de 24 horas.», `13.5px #64748B`.
- Botón de texto «Ahora no», `13.5px #94A3B8`. Cierra el pop up.

**Pantalla de éxito**
- Check blanco dentro de un círculo `#22C55E` de 52 px.
- «¡Recibido!», `23px 700`.
- «Te contactaremos en menos de 24 horas para quedar y enseñártelo.»
- Botón «Seguir navegando», `#030712` sobre blanco, que cierra el pop up.

**Envío:** `informe` → `{ domain, email, name }`.

### 8.2 Modal de contacto (3 modos: asesoria, osint y auditoria)
**Fondo:** `rgba(3,7,18,.7)` con `blur(3px)`.

**Tarjeta**
- Estilo: `max-width:540px; max-height:calc(100vh - 40px); overflow:auto; padding:36px 32px; box-shadow:0 40px 100px -20px rgba(0,0,0,.6)`.
- Entrada: `glPop .45s cubic-bezier(.2,.8,.2,1)`.
- Botón × de 36 px con fondo `#F3F4F6`.

**Contenido** (`gap:14px`)
- Etiqueta: `#22C55E 15px 700 letter-spacing:.04em uppercase`.
- `h3`: `26px 700 #030712; line-height:1.2`.
- Pregunta: `14.5px 500 #334155`.
- Opciones:
  - Son botones de selección única. El seleccionado lleva `border:1px solid #22C55E; background:#F0FDF4`; el resto, `#D1D5DB` y fondo blanco.
  - Estilo: `padding:10px 14px; 14px; text-align:left`.
  - En el modo asesoría cada opción ocupa el ancho completo, una por fila.
- Campos:
  - Estilo: `border:1px solid #D1D5DB; padding:15px; 16px`.
  - Foco: `border-color:#22C55E; box-shadow:0 0 0 3px rgba(34,197,94,.2)`.
- Botón principal a todo el ancho, con `padding:17px` y `18px`.
- Debajo: «Te contactaremos en menos de 24 horas. · <a>Prefiero WhatsApp</a>», con el enlace en `#16A34A 500`.

**Pantalla de éxito:** imagen de 130 px, «¡Gracias!» (`26px 700`) y «Te contactaremos en menos de 24 horas.»

| | asesoria | osint | auditoria |
|---|---|---|---|
| Se abre desde | Hero | Situaciones y «Cuéntanos tu caso» en OSINT | «Solicitar auditoría» en FinalCTA |
| Etiqueta | Asesoramiento sin compromiso | Investigación · Confidencial | Auditoría de ciberseguridad |
| Título | Hablemos de tu seguridad | Cuéntanos tu caso | Solicita tu auditoría |
| Pregunta | ¿Qué necesitas? | ¿Qué ha pasado? | ¿Qué te interesa? |
| Opciones | Ciberseguridad: proteger mi empresa de ataques · Ciberinteligencia: investigar una estafa, fraude o suplantación · **No lo sé, quiero que me asesoréis** (marcada) | **Estafa o fraude online** (marcada salvo que el trigger indique otra) · Suplantación de marca · Perfilado y reputación · Otro | **Auditoría perimetral** (marcada) · Pentesting · Red Team · Ciberseguridad continua · No lo sé |
| Campos (* obligatorio) | Tu nombre*, Empresa*, Email*, Teléfono (opcional), textarea «Cuéntanos qué te preocupa o qué ha pasado (opcional)» | Tu nombre*, Email*, Teléfono (opcional), textarea* «Cuéntanos brevemente qué ha pasado» | Tu nombre*, Empresa*, Email*, Teléfono (opcional), textarea «Algo que debamos saber (opcional)» |
| Botón | Quiero hablar con vosotros | Enviar mi caso | Solicitar auditoría |
| Prefiero WhatsApp | `...?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20ciberseguridad%20para%20mi%20empresa` | `...?text=Hola%2C%20quiero%20contaros%20mi%20caso%20(investigaci%C3%B3n)` | `...?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20auditor%C3%ADa%20de%20seguridad%20para%20mi%20empresa` |
| Imagen de éxito | `Hero-GL.webp` | `detective.png` | `360.webp` |
| Envío | tipo `auditoria`: `{ servicio:"No lo sé", name, empresa, email, phone, message: "[Asesoramiento sin compromiso · Ciberseguridad\|Ciberinteligencia\|No lo sabe] " + texto }` | tipo `osint`: `{ caso, name, email, phone, message }` | tipo `auditoria`: `{ servicio, name, empresa, email, phone, message }` |

Las URLs de WhatsApp empiezan por `https://wa.me/34603358517`. Añade un `data-ref` a cada enlace, por ejemplo `WEB-MODAL-ASESORIA`.

### 8.3 Modal de partner
- Mismo estilo que el 8.2, con `max-width:520px`.
- Etiqueta: «Programa de Partners».
- Título: «Te enviamos las condiciones en menos de 24 h».
- Opciones: **Despacho / Compliance** (marcada), Consultora y MSSP / IT.
- Campos, todos obligatorios: «Tu nombre», «Nombre de tu empresa o despacho» y «Email profesional».
- Botón: «Recibir condiciones».
- Pantalla de éxito: `marca.png` a 130 px, «¡Gracias!» y «Te enviaremos las condiciones del programa en menos de 24 h.»
- **Envío:** `partner` → `{ tipo, name, empresa, email }`. El valor de `tipo` debe ser exactamente una de las tres opciones.

### 8.4 Mascota con bocadillo (partners)
**Cuándo aparece:** una vez por sesión, cuando `#partners` es visible al menos en un 25 % (`IntersectionObserver` con `threshold:.25`). No aparece si hay un modal abierto. Al aparecer, activa el anillo del header (punto 1).

**Contenedor**
- Estilo: `position:fixed; left:24px; bottom:0; z-index:80; display:flex; align-items:flex-end; gap:4px; pointer-events:none`.
- Los hijos llevan `pointer-events:auto`.

**Mascota** `partner-llave.png`
- Estilo: `width:180px`.
- Entrada: `glPeek .8s cubic-bezier(.2,.8,.2,1) both`.
- La imagen lleva `transform-origin:bottom center` y `glWave 2.4s 1s ease-in-out`, con 2 repeticiones.

**Bocadillo**
- Estilo: `margin-bottom:110px; max-width:290px; background:#FFF; border:1px solid #E5E7EB; padding:20px 20px 18px; box-shadow:0 24px 50px -20px rgba(0,0,0,.35)`.
- Entrada: `glPop .5s .6s both`.
- Pico: un cuadrado de 14 px girado 45°, en `left:-8px; bottom:28px`, con borde izquierdo e inferior `#E5E7EB`.
- Botón × de 28 px en `top:4px; right:4px`, color `#94A3B8`.
- Etiqueta «PROGRAMA DE PARTNERS»: `12px 700 letter-spacing:.1em #16A34A`.
- Texto «¿Tus clientes te piden ciberseguridad? Ofrécela con nuestro equipo técnico.»: `16.5px 500 #111827; line-height:1.4; margin:8px 0 14px`.
- Botón «Hazte partner» a todo el ancho, con `padding:12px`. Cierra la mascota y abre el modal de partner.

**Móvil** (menos de 640 px): mascota de 120 px, bocadillo con `max-width:220px` y `margin-bottom:70px`. No debe tapar el widget de WhatsApp, que está abajo a la derecha.

### 8.5 Keyframes (cópialos tal cual)
```css
@keyframes glFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes glRing{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.25,1.7);opacity:0}}
@keyframes glPeek{0%{transform:translateY(120%)}70%{transform:translateY(-5%)}100%{transform:translateY(0)}}
@keyframes glWave{0%,100%{transform:rotate(0)}25%{transform:rotate(-6deg)}75%{transform:rotate(6deg)}}
@keyframes glFade{from{opacity:0}to{opacity:1}}
@keyframes glPop{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:none}}
@keyframes glInUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes glRadar{0%{transform:translate(-50%,-50%) scale(.4);opacity:.8}100%{transform:translate(-50%,-50%) scale(1.6);opacity:0}}
@keyframes glSpring{0%{opacity:0;transform:translateY(60px) scale(.9)}60%{opacity:1;transform:translateY(-8px) scale(1.01)}100%{transform:none}}
```

## 9. Envío de leads (`src/lib/leads.ts`)
**Endpoint**
- `POST ${PUBLIC_LEADS_URL}/lead/${type}`, con `Content-Type: application/json`.
- Añade `PUBLIC_LEADS_URL=https://greenlock-leads.greenlockspain.workers.dev` a `.env.example` y a las variables de entorno del despliegue.

**Cuerpo**
- `{ ...meta, ...data, website, token: '' }`.
- `meta`:
  - `page`: `location.href`, máximo 300 caracteres.
  - `referrer`: `document.referrer`, máximo 300.
  - `utm_source`, `utm_medium` y `utm_campaign`: sacados de la query, máximo 100 cada uno.

**Antispam (honeypot):** cada formulario lleva un campo oculto `<input name="website" tabindex="-1" autocomplete="off" aria-hidden="true">`, situado fuera de la pantalla. Su valor se envía como `website`.

**Límites que valida el Worker** (si no se cumplen, responde 400)
- `domain` 120, `name` 100, `email` 160, `empresa` 140, `phone` 30 y `message` 1000.
- `tipo`, `caso` y `servicio`: solo los valores de las tablas anteriores.
- Pon los mismos `maxlength` en los campos.

**Estados del envío**
- **Mientras se envía:** el botón muestra «Enviando…», queda desactivado y se evita el doble envío.
- **Si responde 200:** se muestra la pantalla de éxito.
- **En cualquier otro caso:** aparece «No se ha podido enviar. Inténtalo de nuevo.» (`13.5px #DC2626`) debajo del botón.

**Medición:** tras un envío correcto, haz `dataLayer.push({ event:'lead_submit', lead_type })`. En `lead_type` usa el modo de la interfaz (`asesoria`, `osint`, `auditoria`, `partner` o `informe`).

**⚠️ CSP:** `public/_headers` tiene `connect-src 'self' https://plausible.io https://*.sanity.io`. **Añade `https://greenlock-leads.greenlockspain.workers.dev`**; si no, el navegador bloqueará los envíos.

**Previsualizaciones:** el Worker solo acepta los orígenes `https://greenlock.tech` y `https://www.greenlock.tech`. Desde los despliegues de prueba (`*.pages.dev`) responderá 403, y es lo esperado.

## 10. Assets nuevos (en `assets/`, cópialos a `src/assets/`)
| Archivo | Uso |
|---|---|
| `partner-mssp.png` | Tarjeta de partner MSSP |
| `partner-consultoria.png` | Tarjeta de partner de consultoría y paso 01 de OSINT |
| `partner-compliance.png` | Tarjeta de partner de compliance y paso 03 de OSINT |
| `partner-llave.png` | Mascota con bocadillo |
| `continua-robot.png` | Servicio de Ciberseguridad Continua |

- Son PNG de unos 2 MB. Usa siempre `<Image>` de `astro:assets` para que se conviertan a webp con un tamaño razonable.
- `detective.png`, `estafador.png`, `marca.png`, `Hero-GL.webp` y `360.webp` ya están en el repo.

## 11. Comprobación
- `npm run build` termina sin errores.
- A 375 px y a 1440 px no hay desbordamiento horizontal.
- El pop up y la mascota aparecen una vez por sesión y nunca encima de otro modal.
- Desde `greenlock.tech`, cada formulario devuelve 200 y el lead llega al CRM.
- En la consola no hay errores de CSP.
- Ningún texto visible dice «detective».
