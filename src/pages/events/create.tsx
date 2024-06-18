import { Button } from '@/components/ui/button';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    GlobalStyles,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Create() {
    const router = useRouter();
    const [value, setValue] = useState<any | null>(dayjs(Date.now()));
    const [task, setTask] = useState<string>('on');
    const [repeat, setRepeat] = useState<boolean>(true);

    const handleTaskChange = (event: SelectChangeEvent) => {
        setTask(event.target.value);
    };

    const handleTimeChange = (newValue: Date | null) => {
        console.log(newValue, typeof newValue);
        setValue(newValue);
    };

    const handleCreate = () => {
        console.log(value, task, repeat);
        const date = dayjs(value);
        // Generate a cron expression for daily repetition at the specified time
        const cronExpression = `${date.minute()} ${date.hour()} * * *`;
        console.log(`Cron Expression: ${cronExpression}`);
    };

    return (
        <>
            <GlobalStyles
                styles={{ '*': { fontSize: '12px', margin: '0px' } }}
            />

            <h1 className="font-bold">Create a scheduled event</h1>
            <p>
                This will create a scheduled event that will run at the
                specified time and date.
            </p>

            <FormGroup>
                <FormControl fullWidth>
                    <InputLabel id="task-label">Task</InputLabel>
                    <Select
                        labelId="task-label"
                        id="task-select"
                        value={task}
                        label="Task"
                        onChange={handleTaskChange}
                    >
                        <MenuItem value={'on'}>On</MenuItem>
                        <MenuItem value={'off'}>Off</MenuItem>
                    </Select>
                </FormControl>
                <MobileTimePicker value={value} onChange={handleTimeChange} />
                <FormControlLabel
                    control={<Checkbox disabled checked={repeat} />}
                    label="Repeat every day"
                />

                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Button
                            variant="outline"
                            color="secondary"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleCreate}>Create</Button>
                    </Grid>
                </Grid>
            </FormGroup>
            {/* {JSON.stringify(crons)} */}
        </>
    );
}
