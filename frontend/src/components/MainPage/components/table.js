import React from "react";
import {table_container} from './scss/table.module.scss';
import {table} from './scss/table.module.scss';

const Table = () => {
    // let rows = [];
    // for (let i = 0; i < 20; i++) {
    //     rows.push(
    //
    //     );
    // }
    return (
        <div className={table_container}>
            <table className={table} align="center" border="2">
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Result</th>
                    <th>Time</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td>13</td>
                    <td>13</td>
                    <td>13</td>
                    <td>13</td>
                    <td>13</td>
                    <td>13</td>
                </tr>
                {/*{rows}*/}
            </table>
         </div>

    );
}

export default Table;

