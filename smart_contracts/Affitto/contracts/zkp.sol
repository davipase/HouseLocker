// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
pragma solidity ^0.8.17;
import "./Secp256k1.sol";
import "./EllipticCurve.sol";
import "./EllipticCurveFastMult.sol";
//import "./SafeMath.sol";
//import "./SafeMath.sol";


/*
* zkp is a library for a special type of zero-kowledge-proof.
* We use the elliptic curve Secp256k1 for operations. 
* The constant variables at the beginning of the contract are paramenters of Secp256k1.
*/  


library zkp{

        // The function Prover yields a proof (a sextuple) for the ownership of the value x, which can be considered a private key 
        // or any other private code, like a password 
        function Prover(uint256 x) public view returns (uint256, uint256, uint256, uint256, uint256, uint256) {
                uint256 r = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp))) % Secp256k1.N;
                (uint256 hx,uint256 hy) = EllipticCurve.ecMul(x, Secp256k1.GX, Secp256k1.GY, Secp256k1.AA, Secp256k1.PP);
                (uint256 ux,uint256 uy) = EllipticCurve.ecMul(r, Secp256k1.GX, Secp256k1.GY, Secp256k1.AA, Secp256k1.PP);         
                uint256 c256 = uint256(uint160(ripemd160(abi.encodePacked(ux,uy,Secp256k1.GX,Secp256k1.GY,hx,hy)))); 
                //built-in function for multiplication mod N (that solves overflow problems)
                uint256 cx = mulmod(x, c256, Secp256k1.N);
                bool check= false;
                bool check2=false;
                //to avoid the overflow of cx + r we perform some modular algebra
                if (r > Secp256k1.N/2){
                        r = r-Secp256k1.N/2;
                        check = true;
                        check2= true;
                }
                if (cx > Secp256k1.N/2){
                        cx = cx-Secp256k1.N/2;
                        check = !check;
                        check2=true;
                }
                uint256 z = 0;
                if (check){
                    z = cx + r;
                    if (z>Secp256k1.N/2){ z -= (Secp256k1.N/2+1);}
                    else {z += Secp256k1.N/2;}    
                }
                else{ 
                        if(check2){z = cx + r - 1;}
                        else {z = cx + r;}}
                return (ux, uy, c256, z, hx, hy);
        }

        //* The function verify takes as input the sextuple generated by Prover and an encrypted value with the key x
        function Verifier(uint256 ux, uint256 uy, uint256 c, uint256 z, uint256 hx, uint256 hy) public pure returns (bool){
            (uint256 h_cx, uint256 h_cy) = EllipticCurve.ecMul(c, hx, hy, Secp256k1.AA, Secp256k1.PP);
            (uint256 point1_x, uint256 point1_y) =  EllipticCurve.ecMul(z, Secp256k1.GX, Secp256k1.GY, Secp256k1.AA, Secp256k1.PP);
            (uint256 point2_x, uint256 point2_y) = EllipticCurve.ecAdd(ux, uy, h_cx, h_cy, Secp256k1.AA, Secp256k1.PP);
            return c ==uint256(uint160(ripemd160(abi.encodePacked(ux,uy,Secp256k1.GX,Secp256k1.GY,hx,hy))))  && point1_x == point2_x && point1_y == point2_y;
        }

        // used to test library functionalities
        function test (uint256 x) public view returns (bool){
                (uint256 a, uint256 b, uint256 c, uint256 d, uint256 e, uint256 f) = Prover(x);
                bool v = Verifier(a, b, c, d, e, f);
                return v;
        }
}