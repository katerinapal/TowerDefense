(function($, undefined)
{
    /**
     * A turret
     * @constructor
     */
    window.TowerDefense.Turret = function(game, x, y, size, range)
    {
        /* @const */ var PI     = Math.PI;
        /* @const */ var TwoPI  =    2*PI;
        /* @const */ var HalfPI =  0.5*PI;

        /* @const */ var RotateStepRad = (Math.PI / 30); // 6 degrees
    
        var turret = this;
    
        var targetAngle = 0;
        var currentAngle = 0;
        var currentAngleDelta = 0;

        function scale(n)
        {
            return n * game.scale;
        }
        
        function descale(n)
        {
            return n / game.scale;
        }
        
        function normalizeAngle(rads)
        {
            var result = rads % TwoPI;
            
            if (result < 0)
            {
                result += TwoPI;
            }
            
            return result;
        }
        
        function updateAngle()
        {
            if (Math.abs(currentAngle - targetAngle) >= Math.abs(currentAngleDelta))
            {
                currentAngle = normalizeAngle(currentAngle + currentAngleDelta);
            }
            else
            {
                currentAngle = targetAngle;
                currentAngleDelta = 0;
            }
        }
        
        turret.setTarget = function(tx, ty)
        {
            var dx = descale(tx) - x;
            var dy = descale(ty) - y;
            
            var absdx = Math.abs(dx);
            var absdy = Math.abs(dy);
            
            if (Math.sqrt(absdx*absdx + absdy*absdy) <= range)
            {
                currentAngleDelta = RotateStepRad;
                
                targetAngle = Math.atan2(dy, dx);
                targetAngle = normalizeAngle(targetAngle);
                
                var totalDelta = normalizeAngle(targetAngle - currentAngle);
                
                if (totalDelta > PI)
                {
                    currentAngleDelta = -RotateStepRad;
                }
            }
        };
        
        turret.paint = function(context)
        {
            function drawTurretBase()
            {
                context.beginPath();
                context.arc(0, 0, scale(size*0.4), 0, TwoPI);
                context.closePath();

                context.lineWidth = 1;
                context.strokeStyle = 'black';
                context.stroke();
            }
            
            function drawTurret()
            {
                context.save();
                context.rotate(currentAngle);
                context.translate(scale(-size/2), scale(-size/2))

                context.lineWidth = 2;
                context.strokeStyle = 'black';
                context.strokeRect(scale(size*0.25), scale(size*0.4), scale(size*0.75), scale(size*0.2));
                context.restore();
            }
            
            function drawRange()
            {
                context.beginPath();
                context.arc(0, 0, scale(range), 0, TwoPI);
                context.closePath();
                
                context.lineWidth = 1;
                context.strokeStyle = 'white';
                context.stroke();
            }
            
            updateAngle();
            
            context.save();
            context.translate(scale(x), scale(y));
            
            drawTurretBase();
            drawTurret();
            drawRange();
            
            context.restore();
        }
    };
    
})(jQuery);