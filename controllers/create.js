const AD = require('ad');

const ad = new AD({
    url: process.env.DOMAIN_URL,
    user: process.env.DOMAIN_USER,
    pass: process.env.DOMAIN_USER_PASSWORD,
    baseDN: process.env.DOMAIN_BASE_DN
});


module.exports.renderNewUserForm = (req, res) => {
    res.render('create')
}

module.exports.createNewUser = async (req, res) => {
    try {
        const { firstName, lastName, emailDomain } = req.body.newUser;
        const userName = `${firstName}.${lastName}`;
        const commonName = `${firstName} ${lastName}`
        const email = userName + emailDomain;
        const newUser = {
            userName,
            commonName,
            firstName,
            lastName,
            // email,
            location: '/IT Dept/Users',
            password: process.env.NEW_USER_PASSWORD
        }
        const createdUser = await ad.user().add(newUser);
        return res.send('It worked!');
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
}