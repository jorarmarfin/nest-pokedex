<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
# Pokedex

### Ejecutar en desarrollo

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd pokedex
   ```

2. **Instalar dependencias**

   ```bash
   yarn install
   ```

3. **Tener Nest CLI instalado**

   Asegúrate de tener instalado el CLI de NestJS:

   ```bash
   npm i -g @nestjs/cli
   ```

4. **Levantar la base de datos**

   Utiliza Docker para iniciar la base de datos:

   ```bash
   docker-compose up -d
   ```

   Esto levantará la base de datos definida en el archivo `docker-compose.yml`.

5. **Reconstruir la base de datos con la semilla**

   Ejecuta el siguiente endpoint para cargar datos iniciales en la base de datos:

   ```bash
   http://localhost:3000/api/v2/seed
   ```

### Tecnologías utilizadas

- **NestJS**: Framework principal para el backend.
- **Docker**: Para la gestión de la base de datos.
- **TypeORM/Prisma** *(elige la que usaste)*: ORM utilizado para la interacción con la base de datos.
- **PostgreSQL/MySQL/MongoDB** *(especifica la base de datos que usaste)*.

### Notas adicionales

- Asegúrate de tener Docker instalado en tu sistema.
- Configura las variables de entorno en un archivo `.env` basado en el ejemplo `.env.example`.

