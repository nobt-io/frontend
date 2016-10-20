## Naming von Actions:

Actions sollten unterschiedlichen Naming-conventions folgen, abhängig davon, wie sie verwendet werden.

### Thunks:
Ein Thunk ist eine Action, welche eine asynchrone Aktion auslöst. Sie besitzt daher keinen eigenen Namen (im Sinne einer exportierten Konstante), sondern es wird nur die Factory-Methode zur Erzeugung des Thunks exportiert. Diese Methode sollte im Präsens nach der Aktion benannt sein, welche ausgeführt wird. zB fetchNobt

### Synchrone Actions:
Eine synchrone Action ist eine Action, welche eine synchrone Veränderung im Store auslöst. Sie ist daher ein Befehl, welcher typischerweise von der UI erteilt wird, um einen gewissen Zustand herbeizuführen. Ein Beispiel dafür wäre zB die Action 'addMember'. Solche Actions haben einen Typ, da sie von einem Reducer verarbeitet werden müssen. Sie sollten ebenfalls im Präsens benannt werden.

###Events:
Events sind Actions, welche von Thunks dispatched werden. (Synchrone Actions sind nur Objekte und keinen Funktionen und können daher keine weiteren Actions dispatchen.) Diese Events geben an, dass ein gewisses Ereignis innerhalb einer asychnronen Action passiert ist. Da diese Actions ebenfalls von Reducern verarbeitet werden müssen, benötigen diese ebenfalls einen Typ und damit auch eine exportierte Konstante. Da diese Events allerdings nur von einem oder mehreren Thunks dispatched werden, sollten sie nicht exportiert werden. Da Events eine gewisse Situation beschreiben, welche zu dem Zeitpunkt, an dem der Reducer sie verarbeitet, schon passiert sind, werden ihre Namen in der Vergangenheit verfasst. Jeder Thunk wird typischerweise mit 3 Events assoziiert sein: STARTED, SUCCEEDED, FAILED, wobei immer nur 2 davon eintreten (sollten).
