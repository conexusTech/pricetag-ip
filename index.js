import inquirer from 'inquirer';
import _ from 'lodash';
import set_ip_address from 'set-ip-address'

async function registerPrompt() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: '_interface',
            default: 'eth0',
            message: 'Please enter interface',
            validate(v) {
                if (_.isEmpty(v)) {
                    return 'Please provide an interface';
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'ipAddress',
            message: 'Please enter ip Address',
            validate(v_1) {
                if (_.isEmpty(v_1)) {
                    return 'Please provide a ip Address';
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'gateway',
            message: 'Please enter Gateway',
            validate(v_2) {
                if (_.isEmpty(v_2)) {
                    return 'Please provide a Gateway';
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'dns',
            message: 'Please enter DNS',
            validate(v_3) {
                if (_.isEmpty(v_3)) {
                    return 'Please provide a DNS';
                }
                return true;
            },
        },
    ]);
    const {
        _interface, ipAddress, gateway, dns
    } = answer;
    try {
        const eth0 = {
            interface: _interface,
            ip_address: ipAddress,
            // gateway: gateway,
            // nameservers: [dns], // nameservers can also be a string separated by space/comma, ex: `"1.1.1.1, 8.8.8.8 8.8.4.4"`
          }
        set_ip_address.configure([eth0]).then(() => console.log('done writing config files'))

    } catch (error) {
        console.log(`Err: ${error.message}`);
        return initPrompt();
    }
}

registerPrompt()