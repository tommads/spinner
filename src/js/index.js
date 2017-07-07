export const defaultHtml = `<div class="showbox">
                                <svg class="circular-loader" viewBox="25 25 50 50">
                                    <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
                                </svg>
                                <svg id="logo" class="path animate-in " version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="-15 0 60 32">
                                    <path class="a" fill="#7fba23" d="M12.262 0.225c-0.88 0-1.566 0.456-2.062 1.264-0.879-0.958-1.979-1.414-3.463-1.414-3.686 0-6.738 3.002-6.738 7.037 0 4.164 3.023 7.015 6.571 7.015 1.486 0 2.751-0.531 3.63-1.514 0.468 0.955 1.1 1.386 2.062 1.386 1.458 0 2.145-0.957 2.145-2.901v-7.996c0-1.941-0.66-2.877-2.145-2.877zM7.228 9.733c-1.512 0-2.739-1.228-2.739-2.741 0-1.515 1.226-2.739 2.739-2.739 1.515 0 2.741 1.225 2.741 2.739-0 1.512-1.226 2.741-2.741 2.741z"></path>
                                    <path class="o" fill="#7fba23" d="M24.311 0c-4.264 0-7.344 2.976-7.344 7.113s3.080 7.114 7.344 7.114c4.29 0 7.314-2.978 7.314-7.114s-3.024-7.113-7.314-7.113zM24.327 9.95c-1.513 0-2.739-1.225-2.739-2.74 0-1.513 1.227-2.74 2.739-2.74 1.515 0 2.741 1.228 2.741 2.74 0 1.515-1.226 2.74-2.741 2.74z"></path>
                                    <path class="smile" fill="#7fba23" d="M29.311 17.972l-0.132-0.003-3.51 0.003c-0.523 0-0.958 0.384-1.036 0.886l-0.001 0.005c-0.319 1.812-1.16 3.403-2.529 4.77-1.786 1.786-3.945 2.677-6.487 2.677-2.536 0-4.697-0.891-6.481-2.677-1.376-1.376-2.22-2.976-2.534-4.799-0.090-0.489-0.518-0.861-1.033-0.861l-0.082-0.003-3.557 0.003c-0.579 0-1.050 0.47-1.050 1.049 0 0.031 0.002 0.061 0.004 0.090v0.004c0.394 3.287 1.796 6.139 4.214 8.556 2.887 2.886 6.393 4.328 10.519 4.328 4.129 0 7.637-1.442 10.524-4.328 2.418-2.419 3.824-5.272 4.216-8.56l0.001-0.001c0.002-0.030 0.003-0.060 0.003-0.090 0-0.579-0.469-1.049-1.049-1.049z"></path>
                                </svg>
                            </div>`;


export const lineLoaderHtml = `<div class="road-container">
                                    <div class="road"><div class="green-road"></div></div>
                                    <img class="van" src="src/img/van.svg" >
                                    <img class="tree" src="src/img/nature.svg" >
                                    <img class="lamp" src="src/img/light-bulb.svg" >
                                    <img class="home" src="src/img/home.svg" >
                                </div>`;


export default class Spinner {

    constructor(obj) {
        this.state = {
            enabled: false,
            theme: obj.theme || 'default',
            percentage: obj.percentage || 0,
            container: obj.container || document.body,
            spinner: null
        };
    }

    add() {
        switch (this.state.theme) {
            case 'lineLoader':
                this.createLineLoader();
                break;
            default:
                this.createDefaultSpinner();
                break;
        }
    }

    createDefaultSpinner() {
        let container = this.state.container instanceof HTMLElement ?  this.state.container : document.querySelector(this.state.container);

        if (container && container instanceof HTMLElement) {
            let temp = document.createElement('div');
            temp.innerHTML = defaultHtml;
            let spinner = temp.children[0];
            console.log(temp.children);
            this.state.spinner = spinner;
            container.appendChild(spinner);
        }
    }

    createLineLoader() {
        let container = this.state.container instanceof HTMLElement ?  this.state.container : document.querySelector(this.state.container);

        if (container && container instanceof HTMLElement) {
            let temp = document.createElement('div');
            temp.innerHTML = lineLoaderHtml;
            let spinner = temp.children[0];
            this.state.spinner = spinner;
            container.appendChild(spinner);
        }
    }

    remove() {
        let container = this.state.container instanceof HTMLElement ?  this.state.container : document.querySelector(this.state.container);

        if (container && container instanceof HTMLElement) {
            let spinner = this.state.spinner;

            if (spinner) {
                spinner.style.opacity = '0';
                setTimeout(function() {
                    spinner.parentNode.removeChild(spinner);
                }, 500);
            }
        }
    }

    update(percentage) {
        let container = this.state.container instanceof HTMLElement ?  this.state.container : document.querySelector(this.state.container);

        if ( container && container instanceof HTMLElement && this.state.theme === 'lineLoader' ) {
            let spinner = this.state.spinner;

            if (spinner) {
                this.state.percentage = percentage;
                // console.log('this is a line loader', percentage );
                let van = spinner.querySelector('.van'),
                    tree = spinner.querySelector('.tree'),
                    lamp = spinner.querySelector('.lamp'),
                    greenRd = spinner.querySelector('.green-road'),
                    home = spinner.querySelector('.home');

                van.style.left = ( percentage * 5 ) - 100;
                tree.style.right = ( percentage * 3 ) - 60;
                lamp.style.right = ( percentage * 3 ) - 90;
                greenRd.style.width = percentage * 5;
                home.style.right = ( percentage * 3 ) - 290;

            }

        }
    }


}


document.addEventListener('DOMContentLoaded', function() {
    let spinner = new Spinner({container: '.spinner'});
    let lineLoader = new Spinner({container: '.progress-container', theme: 'lineLoader'});
    let j = 0;

    spinner.add();
    lineLoader.add();

    let updateLineInterval = setInterval(function() {
        j++;
        lineLoader.update(j);

        if (j === 100) {
            clearInterval(updateLineInterval);
        }
    }, 100);
});