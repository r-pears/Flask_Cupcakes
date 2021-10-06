const base_url = 'http://localhost:5000/api'

// Generate HTML from JSON data about a cupcake.
function generateCupcake (cupcake) {
    return `
        <div data-cupcake-id=${cupcake.id}>
            <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button onclick="deleteCupcake(this)" class="delete-button">X</button>
            </li>
            <img class="cupcake-img"
                src="${cupcake.image}
                alt="cupcake image"
            >
        </div>
    `;
}

// Show all cupcakes on the page.
async function showAllCupcakes () {
    const response = await axios.get(`${base_url}/cupcakes`);
    const cupcake_list = document.querySelector('#cupcakes-list')

    for (let cupcake of response.data.cupcakes) {
        let newCupcake = generateCupcake(cupcake);
        cupcake_list.append(newCupcake);
    }
}

// Handle form submission of adding a new cupcake
function addCupcake () {
    const cupcake_list = document.querySelector('#cupcakes-list')
    const cupcakeForm = document.querySelector('#new-cupcake')
    let flavor = document.querySelector('#form-flavor').value;
    let rating = document.querySelector('#form-rating').value;
    let size = document.querySelector('#form-size').value;
    let image = document.querySelector('#form-image').value;
    
    const newCupcakeResp = await axios.post(`${base_url}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });
    
    let newCupcake = generateCupcake(newCupcakeResp.data.cupcake);
    cupcake_list.append(newCupcake);
    cupcakeForm.reset();
}

// Handle deletion of a cupcake.
