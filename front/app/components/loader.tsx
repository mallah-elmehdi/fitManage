import { Loader as _Loader } from 'components/ui/shadcn-io/ai/loader';

const Loader = () => {
    return (
        <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center bg-white/50 z-10">
            <_Loader size={60} />
        </div>
    );
};

export default Loader;
