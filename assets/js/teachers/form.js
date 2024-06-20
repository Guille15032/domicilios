// encargado de la interacción y configuración del formulario

/**
 * Este objeto contiene las referencias a los elementos clave del formulario
 */
export const formElements = {
    form: document.getElementById('teacherForm'),
    containerId: document.getElementById('containerId'),
    fields: {
        id: document.getElementById('txtId'),
        name: document.getElementById('txtName'),
        description: document.getElementById('txtDescription'),
        numero: document.getElementById('txtNumero'),
        birthDate: document.getElementById('txtBirthDate'),
    },
    buttons: {
        btnSubmit: document.getElementById('btnSubmit'),
    }
};

/**
 * Array de objetos que contiene información para las validaciones
 * Cada objeto contiene una referencia a cada campo, un array de objetos
 * de validaciones que tendrá, el ID del error, el mensaje y la función de validación
 */
export const fieldConfigurations = [
    {
        input: formElements.fields.name,
        validations: [
            {
                errorId: `${formElements.fields.name.id}Required`,
                errorMessage: 'El nombre es obligatorio.',
                // Las validaciones retornaran un false cuando debe mostrar el mensaje de error
                // y un true cuando no debe mostrarlo
                validationFunction: (value) => {
                    return value.trim() !== '';
                }
            }
        ]
    },

    {
        input: formElements.fields.description,
        validations: [
            {
                errorId: `${formElements.fields.description.id}Required`,
                errorMessage: 'La descripción es obligatoria.',
                validationFunction: (value) => {
                    return value.trim() !== '';
                }
            }
        ]
    },

    {
        input: formElements.fields.numero,
        validations: [
            {
                errorId: `${formElements.fields.numero.id}Required`,
                errorMessage: 'El número de teléfono es obligatorio.',
                validationFunction: (value) => {
                    return value.trim() !== '';
                }
            },
            {
                errorId: `${formElements.fields.numero.id}Pattern`,
                errorMessage: "Verifique el número de teléfono ingresado.",
                validationFunction: (value) => {
                    // Puedes ajustar esta expresión regular según el formato de número de teléfono que necesites validar
                    return /^[0-9]{10}$/.test(value); // Esta expresión regular valida un número de teléfono de 10 dígitos
                }
            }
        ]
    },
    

    {
        input: formElements.fields.birthDate,
        validations: [
            {
                errorId: `${formElements.fields.birthDate.id}Required`,
                errorMessage: 'La fecha de vencimiento es obligatoria.',
                validationFunction: (value) => {
                    return value.trim() !== '';
                }
            }
        ]
    },
];

export function getFormData() {
    /**
     * const formData = new FormData(formElements.form);
     * return Object.fromEntries(formData.entries());
     */
    debugger;
    const teacher = {
        id: formElements.fields.id.value.trim() ? parseInt( formElements.fields.id.value.trim() ) : new Date().getTime(),
        name: formElements.fields.name.value,
        description: formElements.fields.description.value,
        numero: formElements.fields.numero.value,
        birthDate: formElements.fields.birthDate.value,
        
    };
    return teacher;
}

export function resetForm() {
    formElements.form.reset();
    hideIdAndChangeElementForNew();
}

export function setFormData(teacher) {
    const { id, name, description, numero, birthDate } = teacher;
    formElements.fields.id.value = id;
    formElements.fields.name.value = name;
    formElements.fields.description.value = description;
    formElements.fields.numero.value = numero;
    formElements.fields.birthDate.value = birthDate;
    showIdAndChangeElementForEdit();
}

function showIdAndChangeElementForEdit() {
    formElements.containerId.classList.replace('d-none', 'd-block');
    formElements.buttons.btnSubmit.classList.replace('btn-success', 'btn-primary');
    formElements.buttons.btnSubmit.textContent = 'Modificar';
}

function hideIdAndChangeElementForNew() {
    formElements.containerId.classList.replace('d-block', 'd-none');
    formElements.buttons.btnSubmit.classList.replace('btn-primary', 'btn-success');
    formElements.buttons.btnSubmit.textContent = 'Enviar';
}