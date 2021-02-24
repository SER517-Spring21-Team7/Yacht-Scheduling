import React from "react";
import {
    KeyboardTimePicker,
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';
import { Grid,
    makeStyles,
 } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
}));


export default function TimeSlots() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        customSlots : [{startTime: '7:00 PM',
        endTime: '8:00 PM'}]
        
    
      });

      return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    state.customSlots.map((slot,index) => {
                        <tr>
                        <td>
                        <MuiPickersUtilsProvider>
                            <Grid>
                            <KeyboardTimePicker
                                margin="normal"
                                id="startTime"
                                name="startTimePicker"
                                label="Time picker"
                                value={slot.startTime}
                              //  onChange={}
                                KeyboardButtonProps={{
                                'aria-label': 'change time',
                                }}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        </td>
                        <td>
                        <MuiPickersUtilsProvider>
                            <Grid>
                            <KeyboardTimePicker
                                margin="normal"
                                id="endTime"
                                name="endTimePicker"
                                label="Time picker"
                                value={slot.endTime}
                               // onChange={}
                                KeyboardButtonProps={{
                                'aria-label': 'change time',
                                }}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        </td>
                        <td>
                            Edit Row
                        </td>
                        <td>
                            Delete Row
                        </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
            <hr/>
            <input type="text" />
            <button>
                Add Item
            </button>
        </div>

      );

}