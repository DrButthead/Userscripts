// ==UserScript==
// @name        Quora
// @author      Oliver Olding
// @namespace   https://www.quora.com/
// @description Appends "?share=1" to links to avoid the login popup
// @version     1
// @grant       none
// @include     https://www.quora.com/*
// @include     http://www.quora.com/*
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AQIEAUZ757A+AAAAyVJREFUWMPtV21IU2EUfnanTit1zpXafmia5kq01KBUInOFGKYVVBBhQdSCUoiQjAxJQ/r4kwlNCUL6k0qlgfZlCDHUdKmlND9SxDHLofNrqVP3rh/Ctevu5t1U/OP5d5773HOec9/zvue9PLPZzMMaGoU1tnUBTva+0FH8gPxRfsRYVztmDeMAAOdNHvAMCYNv3BGEXsq0qyge1yZszrlKel89h2lq0iaP77YBgScvIDKnkFoRAbqGWqK6cwUTvZ005hEkhUR2DG4+EgDA1KAW2pq3GO9R0xz3wB2IvvsUW/bFUw4L0DXUkrprp2AcGaKxkLR07Ml+zBq0JTeDdJUU0L7AS4yYJ2U2RdgUUC0LIRN93bQvkaUgTlFhsyKlPJVoayoXvkRAMJJquii7d4EqW85IzuM7LZkcAOIUFRSPv9DbE33dUGXLid0C+l6XMHxRWBTnzl7MXRxrSQFqRT4xGacZmHfkfs4CFnNNxmmoFfmEs4DBus8W2EZJAGcBbFy2mFYFjP9SW2ACL2/OAti4bDGtCpgZ01sSnV24n+8sXLaYqzYLzMS0vGHk4imywMjsDHcBc3OcYlodRh7bpZjSDTAw48gwc2tVvCCG/h5QfCcIpRHYeiiZLsY4qmeNyVmAT0yCRdf+1fYBAAZqq0h9xhnMTRoYay4MDSeH3zRR/3MXx+S8BFJ5FsUXuDKw4eb6+WnnIoAoYq/F8ujbVKiKDyIAMKRSMiekwBVSeRZlVxMGnEhj+Pr2b/OVxMqonfJbiCksh0SWwuAYNL34mnmejPxsZeD+x885Ng25DKO69NNEU11mNYHDwwgAovOKIPAS0762phItuRmMIzWmoJTyO5jEfiAJvRGdV7R6FxJXsS94FIXJ3xp0PHvErHwlLiSOXMno6kWbkdqoo5O/PxpOYDYjsbqNckjAkpfS4F3QNX6B2bRwCDl7COF3IBH6H00w9PfAfVsIkj51Lk+ALVPdvkx6XhZbfR5x8yFCL95YPQEA8CF5NxlVf7fAxVGxSChVUg73gD3Weu860bwrh3F0GC6eIvinnEVE5n1qWU24/m+4WvYPi25Wj7i9SnkAAAAASUVORK5CYII=
// ==/UserScript==
var share = '?share=1';
var url = window.location.href;
if (url.substr( - share.length) !== share) {
  window.location.href = url + share;
}
