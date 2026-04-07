FROM maven:3.9.9-eclipse-temurin-21 AS builder
WORKDIR /build
COPY backend/pom.xml ./pom.xml
COPY backend/.mvn .mvn
COPY backend/mvnw mvnw
COPY backend/mvnw.cmd mvnw.cmd
RUN chmod +x mvnw mvnw.cmd
COPY backend/src ./src
RUN ./mvnw clean package -DskipTests


FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]