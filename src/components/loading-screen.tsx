import { AnimatePresence, motion } from "framer-motion";

export function FetchLoadingScreen({ state }: { state: boolean }) {
  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-screen bg-white/70 z-50"
        >
          <div className="fixed bottom-2/4 right-2/4 translate-y-2/4 translate-x-2/4 ">
            <div className="w-12 h-12 border-4 rounded-full animate-spin border-r-primary" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
