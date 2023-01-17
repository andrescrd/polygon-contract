require('dotenv').config();

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//     const accounts = await hre.ethers.getSigners();
    
//     for (let i = 0; i < accounts.length; i++) {
//         console.log(`\nAccount ${i}: ${accounts[i].address}`);
//         console.log(`Balance: ${hre.ethers.utils.formatEther(await accounts[i].getBalance())} (ETH)`);
//     }
// });

const CURRENCY = 'USD'

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [
            {
                version: "0.8.10",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            }
        ]
    },
    networks: {
        hardhat: {
            forking: {
                url: `${process.env.ALCHEMY_API_URL}${process.env.ALCHEMY_API_KEY}`
            },
        },
        mumbai: {
            url: `${process.env.ALCHEMY_API_URL}${process.env.ALCHEMY_API_KEY}`,
            accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
        }
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: CURRENCY,
    },
    // etherscan: {
    //     apiKey: process.env.ETHERSCAN_API_KEY,
    // },
};

export default config;
