
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {

    constructor() ERC20('Performance Based Token', 'PTS') {
        _mint(msg.sender, 20000 * 10 ** 18);
    }

    function mint(address to, uint amount) external {
        _mint(to,amount);
    }

        function transferTo(address from,
        address to,
        uint256 amount) public {
        _transfer(from, to, amount);
    }

}

// upgradability, pausability, sanctioning, etc

