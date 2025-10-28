# ALPACA LINK - Guía de Deployment

## Archivos Listos para Producción

Tu sitio web está completamente preparado para subir a tu hosting. Todos los enlaces han sido actualizados para URLs limpias (sin .html).

---

## URLs del Sitio

Con el archivo `.htaccess` configurado, tus URLs funcionarán así:

- `https://tudominio.com/` → Página principal (index.html)
- `https://tudominio.com/productos` → Productos (productos.html)
- `https://tudominio.com/nosotros` → Nosotros (nosotros.html)
- `https://tudominio.com/contacto` → Contacto (contacto.html)
- `https://tudominio.com/privacidad` → Privacidad (privacidad.html)
- `https://tudominio.com/terminos` → Términos (terminos.html)

**Nota**: Las URLs NO incluyen `.html` pero los archivos físicos sí mantienen la extensión.

---

## Estructura de Archivos a Subir

Sube TODO el contenido de esta carpeta a tu hosting:

```
Alpaca Link/
├── .htaccess                           ← IMPORTANTE: URLs limpias
├── index.html
├── productos.html
├── nosotros.html
├── contacto.html
├── privacidad.html
├── terminos.html
├── alpaca-link-images/                 ← Logos y banderasen
├── src/
│   ├── css/                           ← Estilos
│   │   ├── alpaca-global.css
│   │   ├── alpaca-components.css
│   │   ├── index-styles.css
│   │   ├── productos-styles.css
│   │   ├── nosotros-styles.css
│   │   └── contacto-styles.css
│   ├── js/                            ← JavaScript
│   │   └── main-consolidated.js
│   ├── images/                        ← Imágenes del sitio
│   │   ├── real-photos/               ← 17 fotos reales
│   │   ├── hero/
│   │   └── partners/
│   └── fontawesome/                   ← Font Awesome (opcional si usas CDN)
```

---

## Pasos para Subir a tu Hosting

### 1. **Conectarte a tu Hosting**

Opciones:
- **FTP/SFTP**: Usa FileZilla, WinSCP o Cyberduck
- **cPanel**: Usa el File Manager
- **SSH**: Si tienes acceso avanzado

### 2. **Ubicación de Subida**

Sube los archivos a la carpeta raíz de tu dominio:
- **public_html/** (más común)
- **www/** (algunos hostings)
- **htdocs/** (Apache)
- **domain.com/** (algunos paneles)

### 3. **Subir Archivos**

**Importante**: Asegúrate de subir:
- ✅ Archivo `.htaccess` (puede estar oculto)
- ✅ Todos los archivos HTML
- ✅ Carpeta `src/` completa
- ✅ Carpeta `alpaca-link-images/`

### 4. **Verificar el `.htaccess`**

Después de subir, verifica que el archivo `.htaccess` esté en la raíz:

```
public_html/
├── .htaccess      ← Debe estar aquí
├── index.html
├── productos.html
└── ...
```

Si no lo ves, es porque está oculto. Activa "Mostrar archivos ocultos" en tu FTP/File Manager.

---

## Configuraciones Opcionales en .htaccess

El archivo `.htaccess` tiene algunas configuraciones comentadas que puedes activar:

### **1. Forzar HTTPS (cuando tengas SSL)**

```apache
# Descomenta estas líneas:
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### **2. Forzar WWW**

```apache
# Descomenta estas líneas si quieres forzar www.tudominio.com:
RewriteCond %{HTTP_HOST} !^www\.
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]
```

### **3. Página 404 Personalizada (opcional)**

```apache
# Descomenta y crea un archivo 404.html:
ErrorDocument 404 /404.html
```

---

## Verificación Post-Deployment

Después de subir, verifica que TODO funcione:

### **1. URLs Limpias**

Prueba estos enlaces:
- [ ] `tudominio.com/` → Debe cargar index.html
- [ ] `tudominio.com/productos` → Debe cargar productos.html SIN .html
- [ ] `tudominio.com/nosotros` → Debe cargar nosotros.html
- [ ] `tudominio.com/contacto` → Debe cargar contacto.html

### **2. Redirecciones**

Si alguien intenta acceder con .html, debe redirigir:
- [ ] `tudominio.com/productos.html` → Redirige a `/productos`

### **3. Navegación**

- [ ] Logo lleva a `/`
- [ ] Menú principal funciona
- [ ] Enlaces del footer funcionan
- [ ] Botones CTA funcionan
- [ ] Enlaces internos con #anclas funcionan (ej: `/productos#hilado`)

### **4. Imágenes**

- [ ] Logo del header carga
- [ ] Fotos reales (17 imágenes) cargan correctamente
- [ ] Logos de partners cargan
- [ ] Imágenes hero cargan
- [ ] Protección de imágenes funciona (no se pueden descargar fácilmente)

### **5. Estilos y JavaScript**

- [ ] Los estilos CSS se aplican correctamente
- [ ] El menú móvil funciona
- [ ] El carrusel de imágenes funciona
- [ ] Los acordeones FAQ funcionan
- [ ] El botón de WhatsApp aparece

### **6. Formulario de Contacto**

- [ ] El formulario de contacto se ve bien
- [ ] (Configura el procesamiento del formulario con tu backend/email service)

---

## Solución de Problemas Comunes

### **❌ "URLs con .html aún se muestran"**

**Causa**: El `.htaccess` no se subió o el servidor no lo lee.

**Solución**:
1. Verifica que `.htaccess` esté en la raíz
2. Verifica que tu hosting soporte Apache con mod_rewrite
3. Contacta a tu hosting si no funciona

### **❌ "Error 500 Internal Server Error"**

**Causa**: Error en el `.htaccess`

**Solución**:
1. Revisa que no haya errores de sintaxis
2. Comenta las líneas de HTTPS si aún no tienes SSL
3. Contacta a soporte de hosting

### **❌ "Las imágenes no cargan"**

**Causa**: Rutas incorrectas o permisos

**Solución**:
1. Verifica que las carpetas `src/` y `alpaca-link-images/` se hayan subido completas
2. Verifica permisos de carpetas (755) y archivos (644)
3. Revisa las rutas en el navegador (F12 → Network)

### **❌ "Los estilos no se aplican"**

**Causa**: Archivos CSS no se subieron o rutas incorrectas

**Solución**:
1. Verifica que `src/css/` se haya subido completo
2. Abre la consola del navegador (F12) para ver errores
3. Verifica que los nombres de archivos coincidan (sensibles a mayúsculas)

---

## Optimizaciones Post-Deployment

### **1. SSL/HTTPS**

Obtén un certificado SSL gratuito:
- Let's Encrypt (gratuito)
- Cloudflare SSL (gratuito)
- Certificado de tu hosting

Luego activa la redirección HTTPS en `.htaccess`.

### **2. CDN (opcional)**

Usa Cloudflare para:
- Acelerar la carga del sitio
- Protección DDoS
- SSL gratuito
- Cache de archivos estáticos

### **3. Compresión de Imágenes**

Las imágenes ya están optimizadas, pero puedes comprimirlas más:
- TinyPNG
- ImageOptim
- Squoosh

### **4. Google Search Console**

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Añade tu dominio
3. Envía el sitemap (crea uno en `sitemap.xml`)
4. Solicita indexación

### **5. Google Analytics (opcional)**

Añade el código de tracking antes del `</head>` en todos los archivos HTML.

---

## SEO - Siguientes Pasos

1. **Sitemap XML**: Crea un sitemap.xml y súbelo
2. **robots.txt**: Crea un archivo robots.txt
3. **Open Graph**: Ya configurado en las meta tags
4. **Google Business**: Registra tu negocio
5. **Backlinks**: Consigue enlaces de calidad

---

## Contacto de Desarrollo

**Desarrollador**: Christian Reyes
**Email**: mrchrear@gmail.com

---

## Checklist Final Antes de Subir

- [ ] Todos los enlaces probados localmente
- [ ] Todas las imágenes cargando
- [ ] Formulario de contacto funcionando
- [ ] Responsive design verificado
- [ ] URLs limpias funcionando con servidor local
- [ ] `.htaccess` listo
- [ ] Meta tags de SEO configurados
- [ ] Favicon configurado
- [ ] WhatsApp link con número correcto

---

## ARCHIVOS QUE **NO** DEBES SUBIR

⚠️ **IMPORTANTE**: Tu proyecto tiene **~2,300 archivos** en total, pero **SOLO necesitas subir 75 archivos** al hosting.

### **Por qué tantos archivos?**

```
Total archivos en carpeta: 2,351
├── .git/          → 2,275 archivos ❌ NO subir (repositorio Git)
├── .claude/       → 1 archivo     ❌ NO subir (configuración Claude)
└── Archivos web   → 75 archivos   ✅ SÍ subir (tu sitio)
```

### **NO subas estos archivos/carpetas:**

- ❌ **`.git/`** - Repositorio Git (2,275 archivos innecesarios)
- ❌ **`.claude/`** - Configuración de Claude Code
- ❌ **`README-DEPLOYMENT.md`** - Este archivo de documentación
- ❌ **`node_modules/`** - Si tienes dependencias npm
- ❌ **Fotos originales en raíz** - Solo sube las de `src/images/real-photos/`

### **Solo sube estos 75 archivos:**

```
✅ .htaccess
✅ *.html (6 archivos)
✅ alpaca-link-images/ (5 archivos)
✅ src/
   ├── css/ (6 archivos)
   ├── images/ (33 imágenes)
   └── js/ (1 archivo)
```

---

¡Tu sitio está listo para producción! 🚀
