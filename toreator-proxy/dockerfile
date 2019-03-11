FROM gradle:5.1.1-slim


COPY --chown=gradle:gradle . /api/
WORKDIR /api
RUN gradle build
EXPOSE 8080

CMD gradle runApi
