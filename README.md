# Oktana · Agentforce — Crear. Acelerar. Cerrar.

## Overview
Presentación HTML en español de 7 slides para reuniones con Salesforce AEs. El guion prioriza colaboración comercial, generación de pipeline con BDRs, QuickStarts, industrias y un siguiente paso concreto.

## Features
- 3 o 4 bullets por slide; QuickStarts en cuatro tarjetas, títulos grandes y frases mnemotécnicas.
- Scroll del mouse, flechas, Page Up/Down, Inicio/Fin y barra espaciadora.
- Botones anterior/siguiente, selector de slide y pantalla completa cuando el navegador la permite.
- Scroll táctil nativo y diseño adaptable. En slides más altas que la pantalla se conserva el scroll normal para leer todo.
- Sin dependencias, instalación ni conexión a internet.

## Project Structure
- index.html: contenido semántico editable.
- styles.css: tema, tipografía y adaptación responsive.
- script.js: navegación y controles.
- README.md: instrucciones y referencias.
- ../Oktana_Agentforce_Presentacion.html: versión autónoma, con CSS y JavaScript incluidos, entregada también por separado.

## Technologies
HTML5, CSS y JavaScript nativos; tipografías del sistema y elementos gráficos CSS.

## Running Locally
Abre index.html en tu navegador manteniendo los archivos de la carpeta juntos. Alternativamente, abre el HTML autónomo; no necesita ningún otro archivo. También puedes ejecutar `python3 -m http.server 8000` dentro de la carpeta y visitar http://localhost:8000.

## Customization
Edita títulos, frases y listas en index.html. Ajusta colores en las variables de :root en styles.css. Cada sección .slide representa una diapositiva. Si añades slides, actualiza también las opciones del selector. JavaScript sincroniza la numeración de encabezados, pies y selector con el orden real. El total usado por JavaScript se calcula automáticamente.
La versión autónoma es una copia empaquetada: después de editar los archivos separados, vuelve a insertar su CSS y JS para actualizarla.

## Accessibility
Listas reales, encabezados, botones nativos, nombres accesibles, foco visible, estado anunciado y soporte prefers-reduced-motion. En móviles se ocultan los gráficos decorativos para preservar espacio para el texto. Los controles se recorren con Tab; el selector conserva sus teclas nativas. No constituye certificación WCAG.

## Security Considerations
No recopila datos ni usa cookies, analítica, formularios, almacenamiento local, servicios externos o credenciales. No usa eval ni inserta HTML desde entradas del usuario. No requiere backend. El proveedor de hosting gestiona HTTPS y encabezados de seguridad; no se han configurado servicios de hosting.

## Deployment
Para GitHub Pages: sube los cuatro archivos de esta carpeta a la raíz de un repositorio. En Settings > Pages selecciona Deploy from a branch, la rama main y /(root). Guarda y espera la URL de publicación. No se creó repositorio ni se publicó esta entrega.

## Assumptions Made
- Audiencia: Salesforce AEs; idioma: español, según el documento adjunto.
- Estética tech propia: azul noche, cian y violeta, con slides claras para cambios de ritmo. Es una reinterpretación visual, no una reproducción certificada del branding oficial.
- La marca aparece escrita como texto; no se presenta como archivo oficial del logotipo.
- Collections y casos por industria proceden del guion; sus bullets son ejes de discovery, no promesas de funcionalidades ya implementadas.
- La aseguradora es un ejemplo ilustrativo, no un caso de éxito real.
- No se incluyen precios, plazos, ROI ni métricas no confirmadas en las fuentes utilizadas.

## Sources
1. Script Presentacion.pdf, adjunto del usuario: narrativa, BDRs, ecosistema, agentes, industrias y cierre.
2. https://oktana.com/agentforce/ : referencia solicitada; no fue accesible durante la consulta.
3. https://oktana.com/ai-agents-coding-services-agentforce/ : contenido oficial recuperado el 1 de octubre de 2026; capacidades resumidas de SDR Agent, Sales Copilot y Service Agent; alcance sujeto a discovery. Se usaron menos de 200 palabras derivadas de esta página.

## Verification / Known Limitations
Validación estructural: 7 slides, 3–4 bullets en cada una, IDs únicos, un h1, referencias locales existentes, ausencia de dependencias externas y sintaxis JavaScript comprobada. Revisión de código responsive, teclado, scroll y reduced motion.
La prueba visual y de interacción con Chromium no pudo ejecutarse: el entorno no tiene navegador instalado y su descarga falló. No se afirman pruebas reales en 320/375/768/1024/1440, Safari o Firefox, ni puntuaciones Lighthouse. La pantalla completa depende del navegador y puede no estar disponible dentro de una vista previa incrustada. Para presentar, abre el archivo en una ventana independiente.


## Iteración 3
- Slides 1–3 de la versión anterior unidos en una apertura de cuatro puntos.
- Collections se integra con SDR, Sales Copilot y Service: cuatro cuadros centrados en 2 × 2; una columna en móviles.
- Total: 7 slides. Numeración 01–07 consistente en encabezados, pies y selector; cálculo dinámico para evitar futuros desfases.
- Animación de 260 ms sin bloqueo temporal de entradas. Cada gesto nuevo retoma la animación de inmediato; no hay cola de avances pendientes.
- Rueda: respuesta al primer evento significativo, agrupación de ráfagas con 100 ms de separación para eventos típicos de rueda y 180 ms para deltas pequeños de trackpad. La API wheel no proporciona un identificador universal de gesto; estos umbrales son heurísticos.
- Pruebas simuladas en Node.js aprobadas: primer evento, nuevo gesto durante transición, ráfaga sostenida, inversión de dirección, cola de trackpad, lectura de slides altas, reduced motion, límites del teclado y numeración. No equivalen a probar un mouse físico ni a inspección visual en navegador.

## Iteración 4
- Nueva introducción: Partnership Salesforce + Oktana y agenda de cuatro puntos.
- Nuevo agradecimiento: equipo, pipeline, acción y relevancia por industria.
- Los siete slides de la iteración 3 conservan su contenido y orden; cambia solamente su numeración.
- Total actual: 9 slides. Validación estructural de IDs, encabezado h1 único, 3–4 puntos por slide, selector y numeración 01–09 aprobada. Comparación automática del contenido de los siete slides existentes: sin cambios.
- Navegación y algoritmo de scroll de la iteración 3 conservados. La verificación visual en navegador sigue pendiente.

## Iteración 5
- Los antiguos slides 5–7 forman una vista de tres columnas: industrias, Financial Services y aseguradora como ejemplo ilustrativo. Contenido de sus listas conservado. En pantallas de hasta 800 px las columnas se apilan para mantener la lectura.
- Tipografía mayor en títulos, bullets, QuickStarts, agenda y textos auxiliares. Si la altura disponible es insuficiente, se permite leer mediante scroll dentro del slide.
- Título de apertura centrado y ampliado; agenda sangrada a la derecha y alineada a la izquierda.
- Total actual: 7 slides; IDs, selector y numeración verificados. La inspección visual en navegador sigue pendiente; no se modifica el algoritmo de navegación.

## Iteración 6
- Ilustraciones vectoriales contextuales en los slides 2, 3, 6 y 7: conversación a acción; cuatro personas hacia un objetivo; selección de cuentas; vínculos de colaboración con crecimiento.
- SVG propios integrados en HTML, sin imágenes externas ni logos oficiales. Colores adaptados a fondos claros y oscuros.
- Comprobados: sintaxis XML de los cuatro SVG, presencia de siete slides y conservación del texto de cada slide editado. Navegación sin cambios.

## Corrección del gráfico de cierre
Reemplazados los eslabones con rellenos superpuestos por trazos abiertos con conexión central explícita. Flecha de crecimiento separada en la parte superior. SVG renderizado con Inkscape y revisado visualmente; no se modificó el contenido ni la navegación.
