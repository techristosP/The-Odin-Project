let rainbowEffect = false;
toggleRainbowEffect = () => {
    rainbowEffect = !rainbowEffect;
    let rainbowEffectButton = document.getElementById('rainbow');
    if (rainbowEffect)
        rainbowEffectButton.classList.toggle('clicked');
    else
        rainbowEffectButton.classList.remove('clicked');
};

let opacityMode = false;
toggleOpacityMode = () => {
    opacityMode = !opacityMode;
    let opacityModeButton = document.getElementById('opacity');
    if (opacityMode)
        opacityModeButton.classList.toggle('clicked');
    else
        opacityModeButton.classList.remove('clicked');
};

let clearGrid = () => {
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = 'white';
    }
    // Remove the current grid
    let container = document.getElementsByClassName('container');
    if (container.length != 0) document.body.removeChild(container[0]);
    create(m_size);
};


let m_size;
function create(size) {

    m_size = size;
    let r = 48, g = 14, b = 104;

    let opacity = [];
    for (let i = 0; i < size; i++) {
        opacity[i] = [];
        for (let j = 0; j < size; j++) {
            opacity[i][j] = opacityMode ? 0.1 : 1;
        }
    }
    let color = [];
    for (let i = 0; i < size; i++) {
        color[i] = [];
        for (let j = 0; j < size; j++) {
            if (rainbowEffect) {
                r = Math.floor(Math.random() * 255);
                g = Math.floor(Math.random() * 255);
                b = Math.floor(Math.random() * 255);
            }
            color[i][j] = `${r}, ${g}, ${b}`;
        }
    }


    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    // container.setAttribute('style', 'display: flex; flex-direction: column; justify-content: space-around; align-items: center; width: 100%; height: 100%;');
    document.body.appendChild(container);

    for (let i = 0; i < size; i++) {
        //const row = [];
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        row.style.height = 600 / size + 'px';
        // row.setAttribute('style', 'display: flex; flex-direction: row; justify-content: space-around; align-items: center;');
        document.querySelector('.container').appendChild(row);
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.style.width = 600 / size + 'px';
            cell.style.height = 600 / size + 'px';
            // cell.setAttribute('style', 'wdith: 30px; height: 30px; border-width: 3px; border-style: solid;');

            cell.addEventListener('mouseover', function () {
                cell.style.backgroundColor = `rgba(${color[i][j]}, ${opacity[i][j] += 0.1})`;
            });

            document.querySelector('.container').lastChild.appendChild(cell);
        }
    }

    // alert('Hello World');
}

function setSize() {
    // Remove the current grid
    let container = document.getElementsByClassName('container');
    if (container.length != 0) document.body.removeChild(container[0]);

    // Set the new grid
    let size = prompt('Enter the size of the grid: ');
    create(size);
}

// create();
