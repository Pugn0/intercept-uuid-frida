Java.perform(function () {
    // Definir códigos de cores ANSI
    var reset = "\x1b[0m";
    var bright = "\x1b[1m";
    var dim = "\x1b[2m";
    var fgGreen = "\x1b[32m";
    var fgCyan = "\x1b[36m";
    var fgYellow = "\x1b[33m";
    var fgRed = "\x1b[31m";
    var fgMagenta = "\x1b[35m";

    // Exibir banner e créditos ao iniciar com cores
    console.log(fgMagenta + bright + "\n _______          _          _______                   _              ");
    console.log("(_______)        | |        (_______)                 | |             ");
    console.log("    _  ___   ___ | |  ___    _        ____ _____ _ _ _| | _____  ____ ");
    console.log("   | |/ _ \\ / _ \\| | /___)  | |      / ___|____ | | | | || ___ |/ ___)");
    console.log("   | | |_| | |_| | ||___ |  | |_____| |   / ___ | | | | || ____| |    ");
    console.log("   |_|\\___/ \\___/ \\_|___/    \\______)_|   \\_____|\___/ \\_)_____)_|    ");
    console.log(reset +"                    D E T E C T  ~  U U I D" + reset);
    console.log("                                                                      " + reset);

    console.log(fgCyan + " https://t.me/pugno_yt");
    console.log(" https://t.me/duckettstoneprincipal" + reset);
    console.log("\n");

    // Definir o padrão de UUID (8-4-4-4-12)
    var uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    // Aguardar o contexto da aplicação estar disponível
    var ActivityThread = Java.use('android.app.ActivityThread');

    // Executar quando o aplicativo estiver totalmente carregado
    Java.scheduleOnMainThread(function() {
        var appContext = ActivityThread.currentApplication().getApplicationContext();
        var packageName = appContext.getPackageName();

        // Interceptar métodos que retornam strings, como o Device ID ou UUID
        var StringClass = Java.use('java.lang.String');

        // Sobrescrever o método toString para capturar qualquer string que seja um UUID
        StringClass.toString.implementation = function () {
            var result = this.toString();

            // Verifica se o resultado corresponde ao padrão de UUID
            if (uuidPattern.test(result)) {
                console.log(reset + "UUID capturado: ["+ fgGreen + result + reset +"] App: [" + fgGreen + packageName + reset + "]" + reset);
            }

            return result;  // Retorna o valor original sem alterar
        };

        // Interceptar métodos que possam recuperar o Device ID ou UUID de outros locais (por exemplo, Settings.Secure)
        var settingsSecure = Java.use('android.provider.Settings$Secure');
        settingsSecure.getString.overload('android.content.ContentResolver', 'java.lang.String').implementation = function (resolver, key) {
            var result = this.getString(resolver, key);

            // Verifica se o resultado corresponde ao padrão de UUID
            if (uuidPattern.test(result)) {
                console.log(fgRed + "Settings.Secure: UUID capturado: [" + result + "] App: [" + packageName + "]" + reset);
            }

            return result;  // Retorna o valor original sem alterar
        };
    });
});
