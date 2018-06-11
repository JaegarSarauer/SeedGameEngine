import Component from './Component';

/**
 * A Physics Component can be added to any GameObject and will give it
 * physical properties which can be toggled and adjusted.
 * 
 * This Component should have nothing to do with collisions. Instead, Physics
 * should provide pre and post reactions to collisions, gravity, frictions,
 * and anything else that should respond to an effect or change.
 * 
 * This is intended to be a base class for more specific physics handling
 * depending on the application.
 */
export default class Physics extends Component {
    
}