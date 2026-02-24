class CalculoCalorias extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
            <form id="caloriasForm">

                <input type="number" id="peso" placeholder="Ingrese su peso (kg)" required>
                <input type="number" id="altura" placeholder="Ingrese su altura (cm)" required>
                <input type="number" id="edad" placeholder="Ingrese su edad" required>

                <select id="actividad" required>
                    <option value="">Seleccione nivel de actividad</option>
                    <option value="1.2" data-nivel="sin">Sin actividad física</option>
                    <option value="1.375" data-nivel="bajo">Nivel Bajo</option>
                    <option value="1.55" data-nivel="medio">Nivel Medio</option>
                    <option value="1.725" data-nivel="alto">Nivel Alto</option>
                </select>

                <button type="submit">Calcular</button>

                <div class="resultado" id="resultado"></div>
            </form>
        `;

        const form = this.querySelector("#caloriasForm");

        form.addEventListener("submit", (e) => {
            e.preventDefault(); 

            const peso = parseFloat(this.querySelector("#peso").value);
            const altura = parseFloat(this.querySelector("#altura").value);
            const edad = parseFloat(this.querySelector("#edad").value);
            const actividadSelect = this.querySelector("#actividad");
            const actividad = parseFloat(actividadSelect.value);
            const resultado = this.querySelector("#resultado");

            resultado.className = "resultado"; 

            
            if (!peso || !altura || !edad || !actividad) {
                resultado.innerHTML = "⚠️ Complete todos los campos correctamente.";
                return;
            }

            if (peso <= 0 || altura <= 0 || edad <= 0) {
                resultado.innerHTML = "⚠️ Los valores deben ser mayores a 0.";
                return;
            }

           
            const tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
            const gastoTotal = (tmb * actividad).toFixed(2);

          
            const nivel = actividadSelect.options[actividadSelect.selectedIndex].dataset.nivel;
            resultado.classList.add(`nivel-${nivel}`);

            resultado.innerHTML = `
                🔥 <strong>${gastoTotal} kcal</strong><br><br>
                📌 Este es tu gasto calórico estimado diario.
            `;
        });
    }
}

customElements.define("calculo-calorias", CalculoCalorias);