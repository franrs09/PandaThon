package com.function;

import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Optional;

public class Function {

  String url =
    "jdbc:postgresql://ptpostgresql.postgres.database.azure.com:5432/PandaSQL";
  String user = "Panda";
  String password = "Tech1234";

  class Weather {

    private Integer idclima;
    private String clima;
    private String pais;
    private String ciudad;
    private String nombre;
    private String cedula;

    public Integer getIdclima() {
      return idclima;
    }

    public void setIdclima(Integer idclima) {
      this.idclima = idclima;
    }

    public String getClima() {
      return clima;
    }

    public void setClima(String clima) {
      this.clima = clima;
    }

    public String getPais() {
      return pais;
    }

    public void setPais(String pais) {
      this.pais = pais;
    }

    public String getCiudad() {
      return ciudad;
    }

    public void setCiudad(String ciudad) {
      this.ciudad = ciudad;
    }

    public String getNombre() {
      return nombre;
    }

    public void setNombre(String nombre) {
      this.nombre = nombre;
    }

    public String getCedula() {
      return cedula;
    }

    public void setCedula(String cedula) {
      this.cedula = cedula;
    }
  }

 /*  @FunctionName("GetClima")
  public HttpResponseMessage run(
    @HttpTrigger(
      name = "req",
      methods = { HttpMethod.GET, HttpMethod.POST },
      authLevel = AuthorizationLevel.ANONYMOUS
    ) HttpRequestMessage<Optional<String>> request,
    final ExecutionContext context
  ) {
    context.getLogger().info("Java HTTP trigger processed a request.");

    try {
      Connection connection = DriverManager.getConnection(url, user, password);
      PreparedStatement readStatement = connection.prepareStatement(
        "SELECT * FROM weather;"
      );
      ResultSet resultSet = readStatement.executeQuery();

      Weather weather = new Weather();
      weather.setIdclima(resultSet.getInt("idclima"));
      weather.setClima(resultSet.getString("clima"));
      weather.setPais(resultSet.getString("pais"));
      weather.setCiudad(resultSet.getString("ciudad"));
      weather.setNombre(resultSet.getString("nombre"));
      weather.setCedula(resultSet.getString("cedula"));

      return connection;

    } catch (Exception e) {}
  }*/
}


