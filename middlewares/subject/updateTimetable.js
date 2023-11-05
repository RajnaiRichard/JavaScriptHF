// az órarend megjelenítéséhez szükséges adatok feldolgozása, majd res.localsra tétele a megjelenítéshez


module.exports = function (objectRepository){

    return function(req,res,next)
    {
       /* let orarend = new Array(5,6).fill(0);
        res.locals.targyak.forEach(function(targy){ 
             let Nap_ora = targy.Idopont.split(" ");
                let i,j;
                let idopontok = ['8-10','10-12','12-14','14-16','16-18','18-20'];
                switch(Nap_ora[0])
                {
                    case 'Hetfo':
                        i=0;
                        break;
                    case 'Kedd':
                        i=1;
                        break;
                    case 'Szerda':
                        i=2;
                        break;
                    case 'Csutortok':
                        i=3;
                        break;
                    case 'Pentek':
                        i=4;
                        break;
                }
                switch(Nap_ora[1])
                {
                    case '8-10':
                        j=0;
                        break;
                    case '10-12':
                        j=1;
                        break;
                    case '12-14':
                        j=2;
                        break;
                    case '14-16':
                        j=3;
                        break;
                    case '16-18':
                        j=4;
                        break;
                    case '18-20':
                        j=5;
                        break;
                }
                orarend[i][j]=targy.Targynev;
                 
                
    })*/
    res.locals.idopontok = ['8-10','10-12','12-14','14-16','16-18','18-20'];
    res.locals.napok = ['Hetfo','Kedd','Szerda','Csutortok','Pentek'];
    return next();
}}