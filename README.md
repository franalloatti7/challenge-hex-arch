# 💼 Backend Challenge - Node Developer de Interbanking

Este proyecto implementa una API RESTful para gestionar la adhesión de empresas y el registro de transferencias entre cuentas, utilizando **NestJS** con **arquitectura hexagonal** y base de datos **PostgreSQL**.

---

## ✅ Objetivos del Challenge

- [x] Endpoint para obtener empresas que hicieron transferencias el último mes.
- [x] Endpoint para obtener empresas que se adhirieron el último mes.
- [x] Endpoint para adherir una nueva empresa.

---
## 📣 Consideraciones adicionales

- Se desarrolló un endpoint adicional para la **creación de transferencias**, con el objetivo de facilitar el testeo y la carga de datos. En dicho endpoint, el campo `createdAt` puede ser enviado de forma opcional.  
  - Si se incluye, permite simular transferencias con fecha anterior al último mes.
  - Si no se especifica, el valor por defecto será la fecha actual (`new Date()`).

- Se optó por utilizar el **CBU como identificador de cuentas bancarias** (22 dígitos numéricos), tanto para la cuenta débito como para la cuenta crédito.  
  Esta decisión se tomó para simplificar la implementación, dado que no se contaba con mayor especificación al respecto, y se buscó mantener el enfoque en los requerimientos del challenge.

  ---

## ⚙️ Tecnologías y Herramientas Utilizadas

| Herramienta            | Descripción                                                  |
|------------------------|--------------------------------------------------------------|
| **NestJS**             | Framework backend principal basado en Node.js.               |
| **Prisma ORM**         | ORM para acceso a PostgreSQL con migraciones y validaciones. |
| **PostgreSQL (Docker)**| Base de datos relacional en contenedor.                      |
| **Docker & Compose**   | Orquestación del entorno (DB, Adminer, App, etc.).           |
| **Jest**               | Testing unitario e integración.                              |
| **Swagger (OpenAPI)**  | Documentación interactiva de la API.                         |
| **uuid**               | Generación de identificadores únicos.                        |
| **decimal.js**         | Operaciones precisas con montos monetarios.                  |

---

## 📐 Arquitectura Hexagonal

Se aplicó el patrón de arquitectura hexagonal con las siguientes capas:

- **Dominio**: Entidades puras (`Company`, `Transfer`) y lógica de negocio.
- **Aplicación**: Casos de uso (`CreateTransferUseCase`, etc.).
- **Infraestructura**: Adaptadores que implementan los puertos (repositorios, persistencia con Prisma).
- **Interfaces**: Controladores HTTP expuestos como endpoints.

---

## 🔐 Validaciones y Reglas de Negocio

### Transferencias
- ✅ **Monto válido**: Hasta 10 enteros y 2 decimales.
- ✅ **CBU válido**: 22 dígitos numéricos para cuentas débito y crédito.
- ✅ **Cuentas diferentes**: La cuenta de origen y destino no pueden coincidir.
- ✅ **Empresa existente**: Validación de existencia antes de registrar transferencia.

### Empresas
- ✅ **CUIT único**: No se pueden adherir empresas duplicadas.
- ✅ **Fecha de adhesión**: Registrada automáticamente al adherir.

---

## 🧪 Testing

Se implementaron pruebas con **Jest**, incluyendo:

- 🧱 Casos de uso validados individualmente (unitarios).
- ❌ Casos inválidos: errores por cuentas iguales, montos erróneos, empresa inexistente.
- ✅ Uso de mocks para desacoplar repositorios de infraestructura.

---

## 📄 Documentación de API

Swagger está habilitado en la ruta:

[http://localhost:3000/docs](http://localhost:3000/docs)

Incluye todos los endpoints documentados con request/response y validaciones.

---

## 🐳 Entorno Dockerizado

```bash
docker-compose up --build -d
```

- **PostgreSQL** configurado para persistencia.
- **Adminer** disponible en [http://localhost:8080](http://localhost:8080).
- **Prisma** genera esquema y se conecta automáticamente.
- Soporte para binario `debian-openssl-3.0.x` en entornos Linux.

---

## 🛠️ Setup Inicial

1. Instalar dependencias:

```bash
npm install
```

2. Generar Prisma Client y migraciones:

```bash
npm prisma generate
npm prisma migrate dev
```

3. Levantar servicios con Docker:

```bash
docker-compose up -d
```

---

## 📎 Notas Finales

- La solución fue diseñada con foco en la **escalabilidad** y **separación de responsabilidades**.
- Se respetó la arquitectura hexagonal permitiendo que la lógica de negocio esté desacoplada de la tecnología.

---
