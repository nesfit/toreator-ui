FROM gradle:5.1.1-slim


COPY --chown=gradle:gradle . /web/
WORKDIR /web
RUN gradle build
EXPOSE 3000

CMD gradle runWeb
