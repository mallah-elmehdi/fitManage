import { Database } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Switch } from '~/components/ui/switch';
import { jsonDbSetUpMuscleImbalance } from '~/context/api/muscleImbalanceApi';
import { useAppDispatch } from '~/hooks/use-redux';

const DbJsonSetup = () => {
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState(false);

    const seUp = () => {
        if (checked)
            dispatch(jsonDbSetUpMuscleImbalance())
                .unwrap()
                .then((result) => {
                    toast.success(result.message);
                    setChecked(false);
                })
                .catch((error) => {
                    toast.error(error?.message || 'Failed to set up db');
                });
    };

    return (
        <div className="flex items-center space-x-2">
            <Switch checked={checked} onCheckedChange={(c) => setChecked(c)} />
            <Button disabled={!checked} onClick={seUp}>
                <Database />
                Setup the initial DB
            </Button>
        </div>
    );
};

export default DbJsonSetup;
