L.Control.cascadeButtons = L.Control.extend({
    options: {
        position: 'bottomright',
        direction: 'horizontal',
        className: ''
    },

    initialize: function(buttons, options){
        L.Util.setOptions(this, options);
        this._buttons = buttons;
    },

    onAdd: function (map){
        const className = (this.options.className) ? this.options.className : 'leaflet-control-cascadeButtons';
        const directionClass = this.buildDirection(this.options.direction);
        const toolBar = L.DomUtil.create('div', `${className} ${directionClass}`);

        this._buttons.forEach((button)=>{

            const directionClass = this.buildDirection(this.getOposite(this.options.direction));
            const container = L.DomUtil.create('div', `${directionClass}`);
            toolBar.append(container);

            const mainButton = L.DomUtil.create('button', `${button.icon}`);
            mainButton.setAttribute("type", "button");
            mainButton.setAttribute("aria-expanded", "false");
            mainButton.setAttribute("title", `${button.title}`);
            container.append(mainButton);

            if(button.items && button.items.length>0){

                button.items.forEach((item)=>{
                    const childButton = L.DomUtil.create('button',`${item.icon} hidden`);
                    childButton.setAttribute("type", "button");
                    childButton.setAttribute("aria-expanded", "false");
                    childButton.setAttribute("title", `${item.title}`);
                    container.append(childButton);
                    childButton.addEventListener('click', () => item.command());
                })

                mainButton.addEventListener('click', function(){
                    console.log(container.childNodes[0].classList.contains('activeButton'));
                    if(container.childNodes[0].classList.contains('activeButton') == false){
                        //'expand'

                        container.childNodes.forEach( (child, index) => {
                            if(index==0){

                            }
                            else if(index==1){
                                console.log(child);
                                child.style.display = 'block';
                                child.style.marginTop = "40px";
                                child.style.position = 'fixed';
                            }     
                            else if(index==2){
                                console.log(child);
                                child.style.display = 'block';
                                child.style.marginTop = "80px";
                                child.style.position = 'fixed';
                            }   
                            else if(index==3){
                                console.log(child);
                                child.style.display = 'block';
                                child.style.marginTop = "120px";
                                child.style.position = 'fixed';
                            }   
                            else if(index==4){
                                console.log(child);
                                child.style.display = 'block';
                                child.style.marginTop = "160px";
                                child.style.position = 'fixed';
                            }   
                            else if(index==5){
                                console.log(child);
                                child.style.display = 'block';
                                child.style.marginTop = "200px";
                                child.style.position = 'fixed';
                            }                                                                                                                                          
                            else{
                                console.log(child);
                                //child.style.display = 'block';
                                //child.style.marginTop = "160px";
                                //child.style.position = 'fixed';
                            }
                        });

                    }
                    else{
                        //hide
                        container.childNodes.forEach( (child, index) => {
                            if(index==0){

                            }
                            else if(index==1){
                                console.log(child);
                                child.style.display = 'none';
                                child.style.marginTop = "-40px";
                                child.style.position = 'fixed';
                            }     
                            else if(index==2){
                                console.log(child);
                                child.style.display = 'none';
                                child.style.marginTop = "-80px";
                                child.style.position = 'fixed';
                            }   
                            else if(index==3){
                                console.log(child);
                                child.style.display = 'none';
                                child.style.marginTop = "-120px";
                                child.style.position = 'fixed';
                            }   
                            else if(index==4){
                                console.log(child);
                                child.style.display = 'none';
                                child.style.marginTop = "-160px";
                                child.style.position = 'fixed';
                            }   
                            else if(index==5){
                                console.log(child);
                                child.style.display = 'none';
                                child.style.marginTop = "-200px";
                                child.style.position = 'fixed';
                            }                                                                                                                                          
                            else{
                                console.log(child);
                                //child.style.display = 'block';
                                //child.style.marginTop = "160px";
                                //child.style.position = 'fixed';
                            }

                        });                        

                    }

                    //มีปุ่มย่อย
                    
                    console.log(button.items.length);
                    console.log(button); //ปุ่มmain
                    console.log(container);//ยกชุดทั้งclass vertical-right
                    console.log(container.childNodes); // อ้างถึงปุ่ม มีปุ่ม main และ sub index 0 1 2
                    

                    container.childNodes.forEach( (child, index) => {
                        if(index!==0) child.classList.toggle('hidden');
                    });

                    const isAriaExpanded = JSON.parse(mainButton.getAttribute("aria-expanded"));
                    mainButton.setAttribute('aria-expanded', !isAriaExpanded);

                    (!button.ignoreActiveState) ? mainButton.classList.toggle('activeButton') : '';

                    /*
                    var hasName = 'N';
                    if (name == "true") {
                        hasName = 'Y';
                    }
                    */
                    //var hasName = (name == "true") ? "Y" : "N" ;
                    //var hasName = (name) ? "Y" : "N" ;

                })
            } 
            else {
                mainButton.addEventListener('click', function(){
                    (!button.ignoreActiveState) ? mainButton.classList.toggle('activeButton') : '';
                    button.command();

                    //ไม่มีปุ่มย่อย
                    console.log(button); //ปุ่มmain
                    console.log(container);//ยกชุดทั้งclass vertical-right
                    console.log(container.childNodes); // อ้างถึงปุ่ม มีปุ่ม main และ sub index 0 1 2

                })
            }
        })

        L.DomEvent.disableClickPropagation(toolBar);

        return toolBar;
    },

    buildDirection: function(direction){

        if(direction === "vertical"){
            if((this.options.position).includes('left')){
                if(this.options.position.includes('bottom')) direction = direction + ' col-reverse'
            }
            if((this.options.position).includes('right')){
                if(this.options.position.includes('bottom')) direction = direction + ' col-reverse'
                direction = direction + ' right';
            }
        }
        else if(direction === "horizontal"){
            if((this.options.position).includes('top')){
                if(this.options.position.includes('right')) direction = direction + ' row-reverse';
            }
            if((this.options.position).includes('bottom')){
                if(this.options.position.includes('right')) direction = direction + ' row-reverse';
                direction = direction + ' bottom'
            }
        }

        return direction
    },

    getOposite: function(direction){
        return (direction === "vertical") ? "horizontal" : "vertical"
    }
})

L.cascadeButtons = function(buttons, options){
    return new L.Control.cascadeButtons(buttons, options);  
}