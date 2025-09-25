import { format } from 'date-fns';
import { toast } from 'sonner';
import SessionTable from '~/components/session-table';
import { Badge } from '~/components/ui/badge';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '~/components/ui/drawer';
import { getWorkoutSessionById } from '~/context/api/workoutSession';
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux';
import { TRAINING_PHASE } from '~/lib/enums';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';

const TrainingSession = ({
    numberOfSessions,
    workoutSessionId,
    isToday,
}: {
    numberOfSessions: number | string;
    workoutSessionId?: number | null;
    isToday?: boolean;
}) => {
    const dispatch = useAppDispatch();
    const { workoutSession } = useAppSelector((state) => state.workoutSession);
    const handleFetch = () => {
        if (workoutSessionId)
            dispatch(getWorkoutSessionById(workoutSessionId + ''))
                .unwrap()
                .catch((error) => {
                    toast.error(error?.message || 'Failed to fetch workout session');
                });
    };

    return !workoutSessionId ? (
        <Badge className={`${isToday ? 'bg-secondary text-primary' : ''}`}>{numberOfSessions}</Badge>
    ) : (
        <Drawer>
            <DrawerTrigger asChild onClick={handleFetch}>
                <Badge className={`cursor-pointer ${isToday ? 'bg-secondary text-primary' : ''}`}>{numberOfSessions}</Badge>
            </DrawerTrigger>
            {workoutSession && (
                <DrawerContent>
                    <div className="px-10 pb-10 overflow-auto h-120">
                        <div className="mx-auto w-full max-w-6xl ">
                            <DrawerHeader>
                                <DrawerTitle>{format(workoutSession.date, 'PPPP')} </DrawerTitle>
                                {/* @ts-ignore: Unreachable code error */}
                                <DrawerDescription>{TRAINING_PHASE[workoutSession.training_phase]} </DrawerDescription>
                            </DrawerHeader>
                            <div className="border rounded-md">
                                <SessionTable exercises={workoutSession.exercises} />
                            </div>
                        </div>
                    </div>
                </DrawerContent>
            )}
        </Drawer>
    );
};

export default TrainingSession;
