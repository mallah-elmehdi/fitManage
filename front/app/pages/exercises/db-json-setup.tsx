import axios from 'axios';
import { Database } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import { Switch } from '~/components/ui/switch';

const DbJsonSetup = () => {
    const [checked, setChecked] = useState(false);
    const seUp = () => {
        axios
            .post('http://localhost:9090/exercise/json-db-setup')
            .then((res) => {
                toast.success(res.data.message);
                setTimeout(() => {
                    document.location.reload();
                }, 1000);
            })
            .catch((err) => toast.error(err.message));
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
