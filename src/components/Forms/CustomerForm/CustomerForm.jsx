import { useForm } from "react-hook-form"
import { ButtonPrimary } from "../../Buttons/buttonPrimary";
import { ButtonSecondary } from "../../Buttons/buttonSecondary";
import { InputText } from "../Inputs/inputText";
import { SelectOptions } from "../Selects/selectOptions";
import { useState } from "react";
import { Country, State } from "country-state-city";
import { createRegisterClient } from "../../../api/register.api";
import { createLikes } from "../../../api/register.api";

import './customerForm.css';
import InterestModal from "../Interests/interestSection";
import { NavLink } from "react-router-dom";


export function CustomerForm() {
    const { register, handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {

        const client = {
            city: data.City,
            country: data.Country,
            email: data.Email,
            first_name: data.First_name,
            gender: data.Gender,
            last_name: data.Last_name,
            password: data.Password,
            personal_description: data.Personal_description,
            birth_date: data.birth_date,
        };

        try {
            const resClient = await createRegisterClient(client)

            const user_likes = {
                likes: selectedInterests,
                user_id: resClient.data.id_user
            };

            await createLikes(user_likes);
            alert("Datos enviados correctamente");
            reset();
        } catch (error) {
            console.log(error)
        }

    });

    const optionsGender = [
        { value: "masculino", label: "Masculino" },
        { value: "femenino", label: "Femenino" },
        { value: "noIndicado", label: "Prefiero no decirlo" }
    ];

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [states, setStates] = useState([]);

    const [selectedGender, setSelectedGender] = useState("");
    const [selectedInterests, setSelectedIntersts] = useState("");

    const handleSaveInterests = (selectedInterests) => {
        setSelectedIntersts(selectedInterests)
    }

    const handleCountryChange = (e) => {
        const selectedCountryIsoCode = e.target.value;
        setSelectedCountry(selectedCountryIsoCode);
        const states = State.getStatesOfCountry(selectedCountryIsoCode);
        setStates(states);
        // Limpia el estado seleccionado cuando se cambia el país
        setSelectedState("");
        // Actualizar el valor en el formulario
        setValue("pais", selectedCountryIsoCode);
        console.log(states);
    };

    const handleStateChange = (e) => {
        const selectedStateIsoCode = e.target.value;
        setSelectedState(selectedStateIsoCode);
        // Actualizar el valor en el formulario
        setValue("estado", selectedStateIsoCode);
    };

    return (
        <div className="body-page">
            <div className="form-body-container">
                <h3>Datos personales del cliente</h3>
                <form action="" id="formulario-cliente" onSubmit={onSubmit}>
                    <div className="colums-inputs">
                        <div className="input-2c">
                            <InputText
                                id={"First_name"}
                                label={"Nombre(s)"}
                                type={"text"}
                                required={true}
                                placeholder={"Ingrese su(s) nombre(s)"}
                                register={register("First_name", {
                                    required: {
                                        value: true,
                                        message: "Este campo es obligatorio"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "El nombre debe tener al menos 2 caracteres"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Demaciados caracteres"
                                    }

                                })}
                                errors={errors}
                            />
                        </div>
                        <div className="input-2c">
                            <InputText
                                id={"Last_name"}
                                label={"Apellido(s)"}
                                type={"text"}
                                required={true}
                                placeholder={"Ingrese su(s) apellido(s)"}
                                register={register("Last_name", {
                                    required: {
                                        value: true,
                                        message: "El apellido es requerido"
                                    },
                                    minLength: {
                                        value: 2,
                                        message: "El apellido debe tener al menos 2 caracteres"
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Demaciados caracteres"
                                    }

                                })}
                                errors={errors}
                            />
                        </div>
                        <div className="input-1c">
                            <InputText
                                id={"birth_date"}
                                label={"Fecha Nacimiento"}
                                type={"date"}
                                required={true}
                                placeholder={"DD/MM/AA"}
                                register={register("birth_date", {
                                    required: {
                                        value: true,
                                        message: "Fecha de nacimiento requerida",
                                    },
                                    validate: (value) => {
                                        const fechaNacimiento = new Date(value);
                                        const fechaActual = new Date();
                                        const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
                                        if (edad < 18) {
                                            return "Debe ser mayor de edad";
                                        } else if (edad > 100) {
                                            return "Debe ser menor de 100 años";
                                        } else {
                                            return true;
                                        }
                                    },
                                })}
                                errors={errors}
                            />
                        </div>
                    <div className="input-1c">
                        <SelectOptions
                            id={"Gender"}
                            label={"Género"}
                            name={"genero"}
                            placeholder={"Elija su género"}
                            value={selectedGender}
                            required={true}
                            options={optionsGender}
                            register={register("Gender", {
                                required: {
                                    value: true,
                                    message: "Campo requerido"
                                }
                            })}
                            errors={errors}
                            onChange={(e) => setSelectedGender(e.target.value)}
                        />
                    </div>
                    <div className="input-1c">
                        <SelectOptions
                            className="pais-select"
                            id={"Country"}
                            label={"País"}
                            name={"pais"}
                            placeholder={"Elija un país"}
                            value={selectedCountry}
                            required={true}
                            onChange={handleCountryChange} // Manejador de cambio de selección
                            options={Country.getAllCountries().map(country => ({
                                value: country.isoCode,
                                label: country.name
                            }))}
                            register={register("Country", {
                                required: {
                                    value: true,
                                    message: "Campo requerido"
                                }
                            })}
                            errors={errors}
                        />
                    </div>
                    <div className="input-1c">
                        <SelectOptions
                            id={"City"}
                            label={"Ciudad"}
                            name={"ciudad"}
                            placeholder={"Elija una ciudad"}
                            value={selectedState}
                            required={true}
                            onChange={handleStateChange}
                            options={
                                states.map(state => ({
                                    value: state.isoCode,
                                    label: state.name && state.name.replace(" Department", "")
                                }))
                            }
                            register={register("City", {
                                required: {
                                    value: true,
                                    message: "Campo requerido"
                                }
                            })}
                            errors={errors}
                        />
                    </div>
                    <div className="input-4c">
                        <InputText
                            id={"Email"}
                            label={"Correo electrónico"}
                            type={"email"}
                            required={true}
                            placeholder={"Ingrese su correo electrónico"}
                            register={register("Email", {
                                required: {
                                    value: true,
                                    message: "El Correo es requerido"
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                    message: "Formato de email invalido"
                                }
                            })}
                            errors={errors}
                        />
                    </div>
                    <div className="input-2c">
                        <InputText
                            id={"Password"}
                            label={"Contraseña"}
                            type={"password"}
                            required={true}
                            placeholder={"Ingrese su contraseña"}
                            register={register("Password", {
                                required: {
                                    value: true,
                                    message: "La contraseña es requerida",
                                },
                                minLength: {
                                    value: 8,
                                    message: "Debe tener al menos 8 caracteres"
                                }
                            })}
                            errors={errors}
                        />
                    </div>
                    <div className="input-2c">
                        <InputText
                            id={"confirmarPassword"}
                            label={"Confirmar contraseña"}
                            type={"password"}
                            required={true}
                            placeholder={"Repita su contraseña"}
                            register={register("confirmarPassword", {
                                required: {
                                    value: true,
                                    message: "La confirmación de la contraseña es requerida"
                                },
                                validate: (value) => {
                                    if (value === watch('Password')) {
                                        return true;
                                    } else {
                                        return "Las contraseñas no coinciden";
                                    }
                                }
                            })}
                            errors={errors}
                        />
                    </div>
                    <div className="input-4c descripction">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea name="descripcion" className="textAreaDescription"
                            {...register("Personal_description", {
                                required: {
                                    value: false
                                }
                                , maxLength: {
                                    value: 150,
                                    message: "Numero de caracteres excedido"
                                }
                            })}

                        ></textarea>
                        {errors.descripcion && <span className="error-message">{errors.descripcion.message}</span>}
                    </div>
                    <div className="input-4c">
                        <InterestModal onSaveInterests={handleSaveInterests} />
                    </div>
            </div>
            <div className="buttons-section">
                <NavLink to="/">
                    <ButtonSecondary label={"Cancelar"} />
                </NavLink>
                <ButtonPrimary type={"submit"} label={"Registrarse"} />
            </div>

        </form>
            </div >
        </div >
    )
}