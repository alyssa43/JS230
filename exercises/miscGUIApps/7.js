const cars = [
  { make: 'Honda', image: 'https://d1nrfq3cstnmkv.cloudfront.net/exercises/gui_apps/car_shop_filter/images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'https://d1nrfq3cstnmkv.cloudfront.net/exercises/gui_apps/car_shop_filter/images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'https://d1nrfq3cstnmkv.cloudfront.net/exercises/gui_apps/car_shop_filter/images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'https://d1nrfq3cstnmkv.cloudfront.net/exercises/gui_apps/car_shop_filter/images/toyota-corolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'https://d1nrfq3cstnmkv.cloudfront.net/exercises/gui_apps/car_shop_filter/images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'https://d1nrfq3cstnmkv.cloudfront.net/exercises/gui_apps/car_shop_filter/images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'https://d1nrfq3cstnmkv.cloudfront.net/exercises/gui_apps/car_shop_filter/images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

class CarUI {
  constructor(cars) {
    this.cars = cars;
    this.carsDiv = document.getElementById('cars');
    this.selectEls = document.querySelectorAll('select');
    this.makeSelect = document.getElementById('make_select');
    this.modelSelect = document.getElementById('model_select');

    this.renderFilters();
    this.renderCars();
    this.#initEvents();
  }

  renderFilters() {
    this.selectEls.forEach(el => {
      // Each select's name corresponds to a key on a car objects (make, model, year, price)
      el.appendChild(this.#renderAnyOption());
      const category = el.name;
      if (category === 'model') return;

      const values = this.#retrieveValues(category);
      values.forEach(currentValue => {
        const option = this.#createElement('option', currentValue);
        option.setAttribute('value', currentValue);
        el.appendChild(option);
      });
    });

    this.#updateModelOptions();
  }

  renderCars(cars = this.cars) {
    if (cars.length === 0) {
      this.carsDiv.innerHTML = '<p class="no-results">No cars found matching your criteria.</p>';
      return;
    }

    let finalHtml = '';
    cars.forEach(car => finalHtml += this.#carDivText(car));
    this.carsDiv.innerHTML = finalHtml;
  }

  #initEvents() {
    this.filterBtn = document.querySelector('.filter_btn');
    this.filterBtn.addEventListener('click', () => this.#handleFilter());

    this.makeSelect.addEventListener('change', () => {
      this.#updateModelOptions();
    });
  }

  #updateModelOptions() {
    const selectedMake = this.makeSelect.value;

    const availableCars = selectedMake === 'any'
      ? this.cars
      : this.cars.filter(car => car.make === selectedMake);

    const models = [...new Set(availableCars.map(car => car.model))];
    this.modelSelect.innerHTML = '';
    this.modelSelect.appendChild(this.#renderAnyOption());

    models.forEach(model => {
      const option = this.#createElement('option', model);
      option.setAttribute('value', model);
      this.modelSelect.appendChild(option);
    });
  }

  #handleFilter() {
    const activeFilters = {};
    this.selectEls.forEach(select => {
      activeFilters[select.name] = select.value;
    });

    const filteredCars = this.cars.filter(car => {
      return Object.keys(activeFilters).every(key => {
        const selectedValue = activeFilters[key];
        if (selectedValue === 'any') return true;
        return String(car[key]) === selectedValue;
      });
    });

    this.renderCars(filteredCars);
  }

  #renderAnyOption() {
    const anyOption = this.#createElement('option', 'Any');
    anyOption.setAttribute('value', 'any');
    return anyOption;
  }

  #retrieveValues(category) {
    const values = [...new Set(this.cars.map(car => car[category]))];
    return typeof values[0] === 'number'
      ? values.sort((a, b) => a - b)
      : values.sort();
  }

  #carDivText(car) {
    return `<div class="car">
        <figure>
          <img src="${car.image}">
        </figure>
        <h2>${car.make} ${car.model}</h2>
        <p class="year">Year: ${String(car.year)}</p>
        <p class="price">Price: $${String(car.price)}</p>
        <a href="#">Buy</a>
      </div>`;
  }

  #createElement(type, content) {
    const el = document.createElement(type);
    if (content !== undefined) el.textContent = content;
    return el;
  }
}

new CarUI(cars);