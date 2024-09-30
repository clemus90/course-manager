FROM amazoncorretto:17 AS build

WORKDIR /app
COPY . .
RUN ./gradlew build
RUN cp /app/build/libs/*-boot.jar app.jar

FROM amazoncorretto:17

EXPOSE 8080

COPY --from=build /app/app.jar app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "/app.jar" ]
