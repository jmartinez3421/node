
const isAdmin = async (req, res, next) => {

    if(!req.loggedUser){
        return res.status(500).json({
            msg: 'The token has not been validated'
        });
    }

    const { role, name } = req.loggedUser;

    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${name} hasn't enough privileges`
        });
    }

    next();
}

const hasRole = ( ...roles ) => {
    return (req, res, next) => {

        if(!req.loggedUser){
            return res.status(500).json({
                msg: 'The token has not been validated'
            });
        }

        const { role, name } = req.loggedUser;

        if(!roles.includes(role)){
            return res.status(500).json({
                msg: `${name} hasn't enough privileges`
            });
        }

        next();
    }
}

module.exports = {
    isAdmin,
    hasRole
}

