var bCrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');
module.exports = function (passport, cuenta, persona, comerciante) {
    var Cuenta = cuenta;//modelo
    var Persona = persona;//modelo
    var Comerciante = comerciante;//modelo
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (cuenta, done) {
        done(null, cuenta.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        // console.log("salinas "+id);
        Cuenta.findOne({where: {id: id}, include: [{model: Comerciante, include: {model: Persona}}]}).then(function (cuenta) {
            if (cuenta) {
                var userinfo = {
                    id: cuenta.id,
                    id_cuenta: cuenta.external_id,
                    id_comerciante: cuenta.comerciante.external_id,
                    nombre: cuenta.comerciante.persona.apellido + " " + cuenta.comerciante.persona.nombre,
                    comerciante: cuenta.comerciante.id
                };
                // console.log(userinfo);
                done(null, userinfo);
            } else {
                done(cuenta.errors, null);
            }
        });

    });
    //registro de usuarios por passport
    passport.use('local-signup', new LocalStrategy(
            {
                usernameField: 'correo', //lo que esta como name en el input del registro
                passwordField: 'clave', //lo que esta como name en el input del registro
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                var generateHash = function (password) {
                    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
                };
                //verificar si el email no esta registrado
                Cuenta.findOne({
                    where: {
                        correo: email
                    }
                }).then(function (cuenta) {
                    if (cuenta)
                    {
                        return done(null, false, {
                           // message: req.flash('correo_repetido', 'El correo ya esta regisrado')

                        });

                    } else
                    {
                        var userPassword = generateHash(password);
                        var dataPersona =
                                {
                                    apellido: req.body.apellido,
                                    nombre: req.body.nombre,
                                    //correo: email,
                                    telefono: req.body.telefono,
                                    external_id: uuidv4()
                                };
                        Persona.create(dataPersona).then(function (persona) {
                            if (persona) {

                                Comerciante.create({
                                    ruc: req.body.ruc,
                                    id_persona: persona.id
                                }).then(function (newComerciante, created) {
                                    console.log("Persona creada " + newComerciante);
                                    if (!newComerciante) {

                                        return done(null, false);
                                    }
                                    if (newComerciante) {
                                        console.log("Se ha creado la persona: " + newComerciante.id);
                                        var dataCuenta = {
                                            correo: email,
                                            clave: userPassword,
                                            id_comerciante: newComerciante.id,
                                            external_id: uuidv4()
                                        };
                                        Cuenta.create(dataCuenta).then(function (newCuenta, created) {
                                            if (newCuenta) {
                                                console.log("Se ha creado la cuenta: " + newCuenta.id);
                                                return done(null, newCuenta);
                                            }
                                            if (!newCuenta) {
                                                console.log("cuenta no se pudo crear");
                                                return done(null, false);
                                            }

                                        });
                                    }
                                });
                            } else {
                                return done(null, false, {
                                    //message: 'El rol no existe'
                                });
                            }
                        });

                    }
                });
            }
    ));
    //inicio de sesion
    passport.use('local-signin', new LocalStrategy(
            {
                usernameField: 'correo',
                passwordField: 'clave',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                var Cuenta = cuenta;
                var isValidPassword = function (userpass, password) {
                    return bCrypt.compareSync(password, userpass);
                }
                Cuenta.findOne({where: {correo: email}}).then(function (cuenta) {
                    if (!cuenta) {
                        return done(null, false, {message: req.flash('error', 'Cuenta no existe')});
                    }

                    if (!isValidPassword(cuenta.clave, password)) {
                        return done(null, false, {message: req.flash('error', 'Clave incorrecta')});
                    }

                    var userinfo = cuenta.get();

                    //console.log("HOLA KATYY......"+userinfo.rol );
                    return done(null, userinfo);

                }).catch(function (err) {
                    // console.log("Error:", err);
                    return done(null, false, {message: req.flash('error', 'Cuenta erronea')});
                });
            }
    ));
}