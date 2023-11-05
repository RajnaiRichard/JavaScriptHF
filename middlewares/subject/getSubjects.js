// az itt található előre definiált tárgyak rárakása a res.localsra majd később megjelenítése a weboldalon

module.exports = function (objectRepository){

    return function(req,res,next)
    {
        const targyak = [
            {_id:0, Targynev: "Jelek es rendszerek 1", Idopont: "Kedd 8-10", Kredit: 6},
            {_id:1, Targynev: "Elektromagneses terek", Idopont: "Csutortok 12-14", Kredit: 4}
        ]
        res.locals.targyak=targyak;
        return next();
    }
};
