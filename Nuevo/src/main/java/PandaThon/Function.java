package PandaThon;

import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import java.sql.Timestamp;
import java.util.Optional;

public class Function {

 /* class weather {

    private Int idclima;
    private String clima;
    private String pais;
    private String ciudad;
    private String nombre;
    private String cedula;
    private TIMESTAMP registro;

    public String getIdclima() {
      return idclima;
    }

    public void setIdclima(String idclima) {
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

    public TIMESTAMP getRegistro() {
      return registro;
    }

    public void setRegistro(TIMESTAMP registro) {
      this.registro = registro;
    }
  }*/

  /*Leer datos*/

  @FunctionName("GetClima")
  public LeerDatos run(
    @HttpTrigger(
      methods = { HttpMethod.GET },
      authLevel = AuthorizationLevel.ANONYMOUS
    ) HttpRequestMessage<Optional<String>> request,
    final ExecutionContext context
  ) {
    String url =
      "jdbc:postgresql://ptpostgresql.postgres.database.azure.com:5432/PandaSQL";
    String user = "Panda";
    String password = "Tech1234";
    Connection connection = DriverManager.getConnection(url, user, password);
    context.getLogger().info("Java HTTP trigger processed a request.");

    PreparedStatement readStatement = connection.prepareStatement(
      "SELECT * FROM weather;"
    );
    V_idclima v_idclima = readStatement.executeQuery();
    /*if (!v_idclima.next()) {
      log.info("Id no encontrado");
      return null;
    } else {
      Weather weather = new Weather();
      weather.setIdclima(resultSet.getInt());
      weather.setClima(resultSet.getString());
      weather.setPais(resultSet.getPais());
      weather.setCiudad(resultSet.getCiudad());
      weather.setNombre(resultSet.getNombre());
      weather.setCedula(resultSet.getCedula());
      weather.setRegistro(resultSet.getRegistro());
      return weather;*/
    }
  }

/*Insertar datos*/
/*@FunctionName("PostClima")
    public void InsertarDatos run(
            @HttpTrigger(
                methods = {HttpMethod.POST},
                authLevel = AuthorizationLevel.ANONYMOUS)
                HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");

        log.info("InsertarDatos");
        PreparedStatement insertStatement = connection.prepareStatement("INSERT INTO weather (clima, pais, ciudad, nombre, cedula, registro) VALUES (?, ?, ?, ?, ?, ?);");
        insertStatement.setString(weather.getClima());
        insertStatement.setString(weather.getPais());
        insertStatement.setString(weather.getCiudad());
        insertStatement.setString(weather.getNombre());
        insertStatement.setString(weather.getCedula());
        insertStatement.setTIMESTAMP(weather.getRegistro());
        insertStatement.executeUpdate();

        // Datos de DB
        private String clima;
        private String pais;
        private String ciudad;
        private String nombre;
        private String cedula;
        private TIMESTAMP registro;

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

        public TIMESTAMP getRegistro() {
            return registro;
        }

        public void setRegistro(TIMESTAMP registro) {
            this.registro = registro;
        }

}
*/
