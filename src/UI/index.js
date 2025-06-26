import Home from './Home/Home';
import DMCA from './DMCA/DMCA';
import EULA from './EULA/EULA';
import Support from './Support/Support';
import Terms from './Terms/Terms';
import Privacy from './Privacy_Policy/Privacy';
import Changelog from './Changelog/Changelog';
import Users from './Users/Users';
import Index from './Index/Index';
import Success from './Success/Success';
import Cancel from './Cancel/Cancel';

// Export Home component as Overview for the /home route
const Overview = Home;
const Library = Home; // Use Home component for Library route too
const Profile = Home; // Use Home component for Profile route too

export {
	Home,
	DMCA,
	EULA,
	Support,
	Terms,
	Privacy,
	Changelog,
	Users,
	Index,
	Success,
	Cancel,
	Overview,
	Library,
	Profile
};